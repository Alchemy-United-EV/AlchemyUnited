import { hashPassword } from './auth';
import { storage } from './storage';

export async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await storage.getUserByEmail('admin@alchemyunited.org');
    if (existingAdmin) {
      console.log('Default admin user already exists');
      return;
    }

    // Create default admin user
    const hashedPassword = await hashPassword('AdminPassword123!');
    
    const adminUser = await storage.createUser({
      email: 'admin@alchemyunited.org',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User'
    });

    console.log('Default admin user created:', adminUser.email);
    console.log('Password: AdminPassword123!');
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}