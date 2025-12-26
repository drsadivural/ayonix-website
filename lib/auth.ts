// Simple authentication system with localStorage
// First registered user becomes admin

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
}

const USERS_KEY = 'ayonix_users';
const CURRENT_USER_KEY = 'ayonix_current_user';

// Get all users
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

// Save users
function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register new user (first user becomes admin)
export function registerUser(email: string, password: string, name: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  
  // Check if email already exists
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered' };
  }
  
  // First user is admin
  const isAdmin = users.length === 0;
  
  const newUser: User = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    name,
    isAdmin,
    createdAt: new Date().toISOString(),
  };
  
  // Store password hash (simple base64 for demo - use proper hashing in production)
  const userWithPassword = { ...newUser, passwordHash: btoa(password) };
  
  users.push(userWithPassword as any);
  saveUsers(users);
  
  return { success: true, message: isAdmin ? 'Admin account created!' : 'Account created!', user: newUser };
}

// Login user
export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getUsers() as any[];
  
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  if (user.passwordHash !== btoa(password)) {
    return { success: false, message: 'Invalid password' };
  }
  
  // Set current user
  const { passwordHash, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return { success: true, message: 'Login successful', user: userWithoutPassword };
}

// Get current logged in user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

// Logout
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Check if current user is admin
export function isCurrentUserAdmin(): boolean {
  const user = getCurrentUser();
  return user?.isAdmin ?? false;
}

// Check if any users exist (to determine if first registration)
export function hasAnyUsers(): boolean {
  return getUsers().length > 0;
}
