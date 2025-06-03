// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

console.log('Starting Firebase app initialization...');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr12y9qAWiTFaHPVYaCKKU1fgYCXyK_ao",
    authDomain: "real-time-chat-a665b.firebaseapp.com",
    databaseURL: "https://real-time-chat-a665b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "real-time-chat-a665b",
    storageBucket: "real-time-chat-a665b.firebasestorage.app",
    messagingSenderId: "203807829995",
    appId: "1:203807829995:web:b68313623c9764847833ae",
    measurementId: "G-EFF5SJNKPV"
};

// Wait for Firebase SDK to load and then initialize
let app, auth, database;

function waitForFirebase(callback) {
    if (typeof firebase !== 'undefined') {
        console.log('Firebase SDK loaded successfully');
        callback();
    } else {
        console.log('Waiting for Firebase SDK to load...');
        setTimeout(() => waitForFirebase(callback), 100);
    }
}

function initializeFirebase() {
    try {
        console.log('Initializing Firebase...');
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        database = firebase.database();
        console.log('Firebase initialized successfully');
        init();
    } catch (error) {
        console.error('Failed to initialize Firebase:', error);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('auth-error').textContent = 'Failed to initialize Firebase: ' + error.message;
        document.getElementById('auth-error').classList.remove('hidden');
    }
}

function startApp() {
    waitForFirebase(initializeFirebase);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

// Global variables
let currentUser = null;
let currentRoom = null;
let currentRoomData = null;
let messagesListener = null;
let roomsListener = null;
let friendRequestsListener = null;
let userFriends = {};

// DOM elements
const loading = document.getElementById('loading');
const authScreen = document.getElementById('auth-screen');
const mainApp = document.getElementById('main-app');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const authForm = document.getElementById('auth-form');
const signupFields = document.getElementById('signup-fields');
const loginOptions = document.getElementById('login-options');
const authSubmit = document.getElementById('auth-submit');
const authError = document.getElementById('auth-error');

function init() {
    setupEventListeners();
    const loadingTimeout = setTimeout(() => {
        loading.classList.add('hidden');
        showAuthScreen();
    }, 10000);
    try {
        auth.onAuthStateChanged((user) => {
            clearTimeout(loadingTimeout);
            if (user) {
                currentUser = user;
                showMainApp();
                loadUserProfile();
                loadFriends();
                loadFriendRequests();
                loadRooms();
            } else {
                showAuthScreen();
            }
            loading.classList.add('hidden');
        }, (error) => {
            clearTimeout(loadingTimeout);
            loading.classList.add('hidden');
            showAuthScreen();
        });
    } catch (error) {
        clearTimeout(loadingTimeout);
        loading.classList.add('hidden');
        showAuthScreen();
    }
}

function setupEventListeners() {
    loginTab.addEventListener('click', () => switchToLogin());
    signupTab.addEventListener('click', () => switchToSignup());
    authForm.addEventListener('submit', handleAuth);

    document.getElementById('profile-btn').addEventListener('click', () => showModal('profile-modal'));
    document.getElementById('friends-btn').addEventListener('click', () => {
        showModal('friends-modal');
        loadFriends();
        loadFriendRequests();
    });
    document.getElementById('settings-btn').addEventListener('click', () => showModal('settings-modal'));
    document.getElementById('create-room-btn').addEventListener('click', () => showModal('create-room-modal'));
    document.getElementById('back-to-rooms').addEventListener('click', showRoomsView);
    document.getElementById('room-settings-btn').addEventListener('click', () => {
        loadRoomSettings();
        showModal('room-settings-modal');
    });

    document.getElementById('close-profile').addEventListener('click', () => hideModal('profile-modal'));
    document.getElementById('close-settings').addEventListener('click', () => hideModal('settings-modal'));
    document.getElementById('close-create-room').addEventListener('click', () => hideModal('create-room-modal'));
    document.getElementById('close-friends').addEventListener('click', () => hideModal('friends-modal'));
    document.getElementById('close-room-settings').addEventListener('click', () => hideModal('room-settings-modal'));

    document.getElementById('save-profile').addEventListener('click', saveProfile);

    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('delete-account-btn').addEventListener('click', confirmDeleteAccount);

    document.getElementById('create-room-submit').addEventListener('click', createRoom);
    document.getElementById('save-room-settings').addEventListener('click', saveRoomSettings);
    document.getElementById('invite-friend-btn').addEventListener('click', inviteFriendToRoom);
    document.getElementById('leave-room-btn').addEventListener('click', leaveRoom);

    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    document.getElementById('send-friend-request-btn').addEventListener('click', sendFriendRequest);

    document.getElementById('friends-tab').addEventListener('click', () => switchToFriendsTab());
    document.getElementById('requests-tab').addEventListener('click', () => switchToRequestsTab());

    document.getElementById('confirm-cancel').addEventListener('click', () => hideModal('confirm-modal'));
}

function switchToLogin() {
    loginTab.classList.add('border-primary', 'text-primary');
    loginTab.classList.remove('border-transparent', 'text-gray-500');
    signupTab.classList.remove('border-primary', 'text-primary');
    signupTab.classList.add('border-transparent', 'text-gray-500');
    signupFields.classList.add('hidden');
    loginOptions.classList.remove('hidden');
    authSubmit.textContent = 'Login';
}

function switchToSignup() {
    signupTab.classList.add('border-primary', 'text-primary');
    signupTab.classList.remove('border-transparent', 'text-gray-500');
    loginTab.classList.remove('border-primary', 'text-primary');
    loginTab.classList.add('border-transparent', 'text-gray-500');
    signupFields.classList.remove('hidden');
    loginOptions.classList.add('hidden');
    authSubmit.textContent = 'Sign Up';
}

function switchToFriendsTab() {
    document.getElementById('friends-tab').classList.add('border-primary', 'text-primary');
    document.getElementById('friends-tab').classList.remove('border-transparent', 'text-gray-500');
    document.getElementById('requests-tab').classList.remove('border-primary', 'text-primary');
    document.getElementById('requests-tab').classList.add('border-transparent', 'text-gray-500');
    document.getElementById('friends-content').classList.remove('hidden');
    document.getElementById('requests-content').classList.add('hidden');
}

function switchToRequestsTab() {
    document.getElementById('requests-tab').classList.add('border-primary', 'text-primary');
    document.getElementById('requests-tab').classList.remove('border-transparent', 'text-gray-500');
    document.getElementById('friends-tab').classList.remove('border-primary', 'text-primary');
    document.getElementById('friends-tab').classList.add('border-transparent', 'text-gray-500');
    document.getElementById('requests-content').classList.remove('hidden');
    document.getElementById('friends-content').classList.add('hidden');
}

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const isSignup = authSubmit.textContent === 'Sign Up';
    
    try {
        hideError();
        authSubmit.disabled = true;
        authSubmit.textContent = 'Processing...';
        
        if (isSignup) {
            const username = document.getElementById('signup-username').value;
            if (!username.trim()) {
                showError('Username is required');
                return;
            }
            
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await database.ref(`users/${userCredential.user.uid}`).set({
                username: username.trim(),
                email: email,
                profilePic: '',
                createdAt: Date.now()
            });
        } else {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const userSnapshot = await database.ref(`users/${userCredential.user.uid}`).once('value');
            if (!userSnapshot.exists()) {
                await auth.signOut();
                showError('Account not found in database. Please contact support or create a new account.');
                return;
            }
        }
    } catch (error) {
        showError(error.message);
    } finally {
        authSubmit.disabled = false;
        authSubmit.textContent = isSignup ? 'Sign Up' : 'Login';
    }
}

function showError(message) {
    authError.textContent = message;
    authError.classList.remove('hidden');
}

function hideError() {
    authError.classList.add('hidden');
}

function showAuthScreen() {
    authScreen.classList.remove('hidden');
    mainApp.classList.add('hidden');
}

function showMainApp() {
    authScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
}

function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

async function loadUserProfile() {
    try {
        const snapshot = await database.ref(`users/${currentUser.uid}`).once('value');
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('profile-username').value = userData.username || '';
            document.getElementById('profile-pic').value = userData.profilePic || '';
        }
    } catch (error) { }
}

async function saveProfile() {
    const username = document.getElementById('profile-username').value.trim();
    const profilePic = document.getElementById('profile-pic').value.trim();
    
    if (!username) {
        showCustomAlert('Username is required');
        return;
    }

    try {
        await database.ref(`users/${currentUser.uid}`).set({
            username,
            email: currentUser.email,
            profilePic,
            updatedAt: Date.now()
        });
        hideModal('profile-modal');
    } catch (error) {
        showCustomAlert('Error saving profile: ' + error.message);
    }
}

async function logout() {
    try {
        await auth.signOut();
        hideModal('settings-modal');
    } catch (error) {
        showCustomAlert('Error logging out: ' + error.message);
    }
}

function confirmDeleteAccount() {
    document.getElementById('confirm-title').textContent = 'Delete Account';
    document.getElementById('confirm-message').textContent = 'Are you sure you want to delete your account? This action cannot be undone and will delete all your data.';
    document.getElementById('confirm-ok').onclick = async () => {
        hideModal('confirm-modal');
        document.getElementById('confirm-title').textContent = 'Final Confirmation';
        document.getElementById('confirm-message').textContent = 'This is your final warning. Your account and ALL data will be permanently deleted. Are you absolutely sure?';
        document.getElementById('confirm-ok').onclick = deleteAccount;
        showModal('confirm-modal');
    };
    hideModal('settings-modal');
    showModal('confirm-modal');
}

async function deleteAccount() {
    try {
        await database.ref(`users/${currentUser.uid}`).remove();
        await currentUser.delete();
        hideModal('confirm-modal');
    } catch (error) {
        showCustomAlert('Error deleting account: ' + error.message);
    }
}

async function sendFriendRequest() {
    const friendUsername = document.getElementById('friend-username').value.trim();
    if (!friendUsername) return;
    
    try {
        // Search for user by username
        const usersSnapshot = await database.ref('users').orderByChild('username').equalTo(friendUsername).once('value');
        
        if (!usersSnapshot.exists()) {
            showCustomAlert('User not found');
            return;
        }
        
        const users = usersSnapshot.val();
        const friendId = Object.keys(users)[0];
        
        if (friendId === currentUser.uid) {
            showCustomAlert('You cannot send a friend request to yourself');
            return;
        }
        
        // Check if already friends
        if (userFriends[friendId] === 'accepted') {
            showCustomAlert('You are already friends with this user');
            return;
        }
        
        // Check if request already sent
        const sentRequestSnapshot = await database.ref(`users/${currentUser.uid}/friendRequests/sent/${friendId}`).once('value');
        if (sentRequestSnapshot.exists() && sentRequestSnapshot.val() === 'pending') {
            showCustomAlert('Friend request already sent');
            return;
        }
        
        // Send friend request
        const updates = {};
        updates[`users/${currentUser.uid}/friendRequests/sent/${friendId}`] = 'pending';
        updates[`users/${friendId}/friendRequests/received/${currentUser.uid}`] = 'pending';
        
        await database.ref().update(updates);
        
        document.getElementById('friend-username').value = '';
        showCustomAlert('Friend request sent!', 'success');
    } catch (error) {
        showCustomAlert('Error sending friend request: ' + error.message);
    }
}

async function loadFriends() {
    try {
        const friendsSnapshot = await database.ref(`users/${currentUser.uid}/friends`).once('value');
        userFriends = friendsSnapshot.exists() ? friendsSnapshot.val() : {};
        
        const friendsList = document.getElementById('friends-list');
        friendsList.innerHTML = '';
        
        if (Object.keys(userFriends).length > 0) {
            const friendElements = await Promise.all(
                Object.entries(userFriends).map(async ([friendId, status]) => {
                    if (status === 'accepted') {
                        const friendSnapshot = await database.ref(`users/${friendId}`).once('value');
                        if (friendSnapshot.exists()) {
                            const friendData = friendSnapshot.val();
                            return createFriendElement(friendId, friendData);
                        }
                    }
                    return null;
                })
            );
            friendElements.filter(el => el !== null).forEach(element => {
                friendsList.appendChild(element);
            });
        } else {
            friendsList.innerHTML = '<p class="text-gray-500 text-center py-4">No friends yet</p>';
        }
    } catch (error) {
        console.error('Error loading friends:', error);
    }
}

async function loadFriendRequests() {
    try {
        const requestsSnapshot = await database.ref(`users/${currentUser.uid}/friendRequests/received`).once('value');
        const requestsList = document.getElementById('requests-content');
        requestsList.innerHTML = '';
        
        let pendingCount = 0;
        
        if (requestsSnapshot.exists()) {
            const requests = requestsSnapshot.val();
            const pendingRequests = Object.entries(requests).filter(([_, status]) => status === 'pending');
            pendingCount = pendingRequests.length;
            
            if (pendingRequests.length > 0) {
                const requestElements = await Promise.all(
                    pendingRequests.map(async ([requesterId, _]) => {
                        const requesterSnapshot = await database.ref(`users/${requesterId}`).once('value');
                        if (requesterSnapshot.exists()) {
                            const requesterData = requesterSnapshot.val();
                            return createFriendRequestElement(requesterId, requesterData);
                        }
                        return null;
                    })
                );
                requestElements.filter(el => el !== null).forEach(element => {
                    requestsList.appendChild(element);
                });
            } else {
                requestsList.innerHTML = '<p class="text-gray-500 text-center py-4">No pending requests</p>';
            }
        } else {
            requestsList.innerHTML = '<p class="text-gray-500 text-center py-4">No pending requests</p>';
        }
        
        // Update notification badges
        const badge = document.getElementById('friend-requests-badge');
        const countSpan = document.getElementById('requests-count');
        
        if (pendingCount > 0) {
            badge.textContent = pendingCount;
            badge.classList.remove('hidden');
            countSpan.textContent = pendingCount;
            countSpan.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
            countSpan.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error loading friend requests:', error);
    }
}

function createFriendElement(friendId, friendData) {
    const div = document.createElement('div');
    div.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between';
    div.innerHTML = `
        <div class="flex items-center">
            ${friendData.profilePic ? 
                `<img src="${friendData.profilePic}" class="w-10 h-10 rounded-full mr-3" alt="Profile">` :
                `<div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                    <span class="text-lg font-semibold">${friendData.username.charAt(0).toUpperCase()}</span>
                </div>`
            }
            <div>
                <p class="font-medium">${friendData.username}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Friend</p>
            </div>
        </div>
        <button onclick="removeFriend('${friendId}')" class="text-red-500 hover:text-red-700 p-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>
    `;
    return div;
}

function createFriendRequestElement(requesterId, requesterData) {
    const div = document.createElement('div');
    div.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between';
    div.innerHTML = `
        <div class="flex items-center">
            ${requesterData.profilePic ? 
                `<img src="${requesterData.profilePic}" class="w-10 h-10 rounded-full mr-3" alt="Profile">` :
                `<div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                    <span class="text-lg font-semibold">${requesterData.username.charAt(0).toUpperCase()}</span>
                </div>`
            }
            <div>
                <p class="font-medium">${requesterData.username}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Friend request</p>
            </div>
        </div>
        <div class="flex space-x-2">
            <button onclick="acceptFriendRequest('${requesterId}')" class="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
            <button onclick="declineFriendRequest('${requesterId}')" class="bg-red-500 text-white px-3 py-1 rounded text-sm">Decline</button>
        </div>
    `;
    return div;
}

window.acceptFriendRequest = async function(requesterId) {
    try {
        const updates = {};
        updates[`users/${currentUser.uid}/friends/${requesterId}`] = 'accepted';
        updates[`users/${requesterId}/friends/${currentUser.uid}`] = 'accepted';
        updates[`users/${currentUser.uid}/friendRequests/received/${requesterId}`] = 'accepted';
        updates[`users/${requesterId}/friendRequests/sent/${currentUser.uid}`] = 'accepted';
        
        await database.ref().update(updates);
        
        loadFriends();
        loadFriendRequests();
        showCustomAlert('Friend request accepted!', 'success');
    } catch (error) {
        showCustomAlert('Error accepting friend request: ' + error.message);
    }
};

window.declineFriendRequest = async function(requesterId) {
    try {
        const updates = {};
        updates[`users/${currentUser.uid}/friendRequests/received/${requesterId}`] = 'declined';
        updates[`users/${requesterId}/friendRequests/sent/${currentUser.uid}`] = 'declined';
        
        await database.ref().update(updates);
        
        loadFriendRequests();
        showCustomAlert('Friend request declined', 'info');
    } catch (error) {
        showCustomAlert('Error declining friend request: ' + error.message);
    }
};

window.removeFriend = async function(friendId) {
    try {
        const updates = {};
        updates[`users/${currentUser.uid}/friends/${friendId}`] = null;
        updates[`users/${friendId}/friends/${currentUser.uid}`] = null;
        
        await database.ref().update(updates);
        loadFriends();
        showCustomAlert('Friend removed', 'info');
    } catch (error) {
        showCustomAlert('Error removing friend: ' + error.message);
    }
};

async function createRoom() {
    const roomName = document.getElementById('room-name-input').value.trim();
    if (!roomName) {
        showCustomAlert('Room name is required');
        return;
    }
    try {
        const roomRef = database.ref('rooms').push();
        await roomRef.set({
            name: roomName,
            createdAt: Date.now(),
            createdBy: currentUser.uid,
            users: {
                [currentUser.uid]: {
                    joinedAt: Date.now(),
                    lastSeen: Date.now(),
                    role: 'host'
                }
            }
        });
        document.getElementById('room-name-input').value = '';
        hideModal('create-room-modal');
        
        const snapshot = await roomRef.once('value');
        if (snapshot.exists()) {
            openChatRoom(snapshot.key, snapshot.val());
        } else {
            showCustomAlert('Room created, but failed to open it. Please try again.');
            loadRooms();
        }
    } catch (error) {
        showCustomAlert('Error creating room: ' + error.message);
    }
}

function loadRooms() {
    if (roomsListener) {
        database.ref('rooms').off('value', roomsListener);
    }
    roomsListener = database.ref('rooms').on('value', (snapshot) => {
        const roomsList = document.getElementById('rooms-list');
        roomsList.innerHTML = '';
        if (snapshot.exists()) {
            const rooms = snapshot.val();
            let userRoomsCount = 0;
            Object.entries(rooms).forEach(([roomId, roomData]) => {
                if (roomData.users && roomData.users[currentUser.uid]) {
                    userRoomsCount++;
                    const roomElement = createRoomElement(roomId, roomData);
                    roomsList.appendChild(roomElement);
                }
            });
            if (userRoomsCount === 0) {
                roomsList.innerHTML = '<p class="text-gray-500 text-center py-4">No rooms yet. Create your first room!</p>';
            }
        } else {
            roomsList.innerHTML = '<p class="text-gray-500 text-center py-4">No rooms yet. Create your first room!</p>';
        }
    }, (error) => {
        showCustomAlert('Error loading rooms: ' + error.message);
    });
}

function createRoomElement(roomId, roomData) {
    const div = document.createElement('div');
    div.className = 'p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';
    div.onclick = async () => {
        try {
            const roomSnapshot = await database.ref('rooms/' + roomId).once('value');
            if (roomSnapshot.exists()) {
                openChatRoom(roomId, roomSnapshot.val());
            } else {
                showCustomAlert('Room not found.');
                loadRooms();
            }
        } catch (error) {
            showCustomAlert('Failed to open room: ' + error.message);
        }
    };
    const isHost = roomData.createdBy === currentUser.uid;
    div.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <h3 class="font-semibold">${roomData.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    ${isHost ? 'Host' : 'Member'} • ${Object.keys(roomData.users || {}).length} members
                </p>
            </div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
    `;
    return div;
}

function openChatRoom(roomId, roomData) {
    currentRoom = roomId;
    currentRoomData = roomData;
    document.getElementById('chat-room-name').textContent = roomData.name;
    showChatView();
    loadMessages();

    // Host-only room settings button
    const roomSettingsBtn = document.getElementById('room-settings-btn');
    if (roomData.createdBy === currentUser.uid) {
        roomSettingsBtn.classList.remove('hidden');
    } else {
        roomSettingsBtn.classList.add('hidden');
    }
}

function showRoomsView() {
    document.getElementById('rooms-view').classList.remove('hidden');
    document.getElementById('chat-view').classList.add('hidden');
    if (messagesListener) {
        database.ref(`rooms/${currentRoom}/messages`).off('value', messagesListener);
        messagesListener = null;
    }
    currentRoom = null;
    currentRoomData = null;
}

function showChatView() {
    document.getElementById('rooms-view').classList.add('hidden');
    document.getElementById('chat-view').classList.remove('hidden');
}

async function loadRoomSettings() {
    if (!currentRoom || !currentRoomData) return;
    document.getElementById('edit-room-name').value = currentRoomData.name;

    // Load friends for invitation dropdown
    const inviteSelect = document.getElementById('invite-friend-select');
    inviteSelect.innerHTML = '<option value="">Select a friend...</option>';
    if (Object.keys(userFriends).length > 0) {
        for (const [friendId, status] of Object.entries(userFriends)) {
            if (status === 'accepted' && (!currentRoomData.users || !currentRoomData.users[friendId])) {
                try {
                    const friendSnapshot = await database.ref(`users/${friendId}`).once('value');
                    if (friendSnapshot.exists()) {
                        const friendData = friendSnapshot.val();
                        const option = document.createElement('option');
                        option.value = friendId;
                        option.textContent = friendData.username;
                        inviteSelect.appendChild(option);
                    }
                } catch (error) { }
            }
        }
    }

    // Load room members
    const membersList = document.getElementById('room-members-list');
    membersList.innerHTML = '';
    if (currentRoomData.users) {
        for (const [userId, userData] of Object.entries(currentRoomData.users)) {
            try {
                const userSnapshot = await database.ref(`users/${userId}`).once('value');
                if (userSnapshot.exists()) {
                    const userProfile = userSnapshot.val();
                    const memberElement = createMemberElement(userId, userProfile, userData, currentRoomData);
                    membersList.appendChild(memberElement);
                }
            } catch (error) { }
        }
    }

    // Host-only UI logic
    const isHost = currentRoomData.createdBy === currentUser.uid;
    const fields = document.getElementById('room-settings-fields');
    const notHostMsg = document.getElementById('not-host-msg');
    if (isHost) {
        fields.classList.add('host-enabled');
        notHostMsg.classList.add('hidden');
        document.getElementById('edit-room-name').disabled = false;
        inviteSelect.disabled = false;
    } else {
        fields.classList.remove('host-enabled');
        notHostMsg.classList.remove('hidden');
        document.getElementById('edit-room-name').disabled = true;
        inviteSelect.disabled = true;
    }
}

function createMemberElement(userId, userProfile, userData, roomData) {
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg';
    const isCurrentUser = userId === currentUser.uid;
    const isHost = userData.role === 'host';
    const canRemove = roomData.createdBy === currentUser.uid && !isCurrentUser;
    div.innerHTML = `
        <div class="flex items-center">
            ${userProfile.profilePic ? 
                `<img src="${userProfile.profilePic}" class="w-8 h-8 rounded-full mr-2" alt="Profile">` :
                `<div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                    <span class="text-sm font-semibold">${userProfile.username.charAt(0).toUpperCase()}</span>
                </div>`
            }
            <div>
                <p class="font-medium text-sm">${userProfile.username} ${isCurrentUser ? '(You)' : ''}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${isHost ? 'Host' : 'Member'}</p>
            </div>
        </div>
        ${canRemove ? `
            <button onclick="removeMemberFromRoom('${userId}')" class="text-red-500 hover:text-red-700 p-1 host-only">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        ` : ''}
    `;
    return div;
}

async function saveRoomSettings() {
    if (!currentRoom) return;
    
    const newRoomName = document.getElementById('edit-room-name').value.trim();
    if (!newRoomName) {
        showCustomAlert('Room name is required');
        return;
    }
    
    try {
        await database.ref(`rooms/${currentRoom}/name`).set(newRoomName);
        currentRoomData.name = newRoomName;
        document.getElementById('chat-room-name').textContent = newRoomName;
        hideModal('room-settings-modal');
    } catch (error) {
        showCustomAlert('Error saving room settings: ' + error.message);
    }
}

async function inviteFriendToRoom() {
    const friendId = document.getElementById('invite-friend-select').value;
    if (!friendId || !currentRoom) return;
    
    try {
        if (!userFriends[friendId] || userFriends[friendId] !== 'accepted') {
            showCustomAlert('You can only invite friends to rooms');
            return;
        }
        
        await database.ref(`rooms/${currentRoom}/users/${friendId}`).set({
            joinedAt: Date.now(),
            lastSeen: Date.now(),
            role: 'member'
        });
        
        const roomSnapshot = await database.ref(`rooms/${currentRoom}`).once('value');
        if (roomSnapshot.exists()) {
            currentRoomData = roomSnapshot.val();
            loadRoomSettings();
        }
        
        showCustomAlert('Friend invited successfully!', 'success');
        
    } catch (error) {
        showCustomAlert('Error inviting friend: ' + error.message);
    }
}

async function leaveRoom() {
    if (!currentRoom) return;
    
    document.getElementById('confirm-title').textContent = 'Leave Room';
    document.getElementById('confirm-message').textContent = 'Are you sure you want to leave this room?';
    document.getElementById('confirm-ok').onclick = async () => {
        try {
            await database.ref(`rooms/${currentRoom}/users/${currentUser.uid}`).remove();
            hideModal('confirm-modal');
            hideModal('room-settings-modal');
            showRoomsView();
        } catch (error) {
            showCustomAlert('Error leaving room: ' + error.message);
        }
    };
    showModal('confirm-modal');
}

window.removeMemberFromRoom = async function(userId) {
    if (!currentRoom || currentRoomData.createdBy !== currentUser.uid) return;
    
    try {
        await database.ref(`rooms/${currentRoom}/users/${userId}`).remove();
        const roomSnapshot = await database.ref(`rooms/${currentRoom}`).once('value');
        if (roomSnapshot.exists()) {
            currentRoomData = roomSnapshot.val();
            loadRoomSettings();
        }
    } catch (error) {
        showCustomAlert('Error removing member: ' + error.message);
    }
};

function loadMessages() {
    if (messagesListener) {
        database.ref(`rooms/${currentRoom}/messages`).off('value', messagesListener);
    }
    messagesListener = database.ref(`rooms/${currentRoom}/messages`).on('value', (snapshot) => {
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';
        if (snapshot.exists()) {
            const messages = snapshot.val();
            const sortedMessages = Object.entries(messages).sort((a, b) => a[1].timestamp - b[1].timestamp);
            Promise.all(sortedMessages.map(([messageId, messageData]) => createMessageElement(messageData)))
                .then(messageElements => {
                    messageElements.forEach(element => {
                        messagesContainer.appendChild(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                });
        } else {
            messagesContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No messages yet. Start the conversation!</p>';
        }
    });
}

async function createMessageElement(messageData) {
    const div = document.createElement('div');
    const isOwnMessage = messageData.senderId === currentUser.uid;
    div.className = `flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`;
    let senderName = 'Unknown';
    try {
        const senderSnapshot = await database.ref(`users/${messageData.senderId}`).once('value');
        if (senderSnapshot.exists()) {
            senderName = senderSnapshot.val().username;
        }
    } catch (error) {}
    div.innerHTML = `
        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isOwnMessage 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
        }">
            ${!isOwnMessage ? `<p class="text-xs opacity-75 mb-1">${senderName}</p>` : ''}
            <p>${messageData.text}</p>
            <p class="text-xs opacity-75 mt-1">
                ${new Date(messageData.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
        </div>
    `;
    return div;
}

async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const text = messageInput.value.trim();
    if (!text || !currentRoom) return;
    try {
        const messageRef = database.ref(`rooms/${currentRoom}/messages`).push();
        await messageRef.set({
            senderId: currentUser.uid,
            text,
            timestamp: Date.now()
        });
        messageInput.value = '';
    } catch (error) {
        showCustomAlert('Error sending message: ' + error.message);
    }
}

function showCustomAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : 'bg-red-500';
    alertDiv.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}