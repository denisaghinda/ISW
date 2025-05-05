import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';

beforeEach(() => {
  localStorage.clear();
});

describe('Login Component', () => {
  test('logs in with valid credentials', () => {
    const mockOnLogin = jest.fn();
    const users = [{ username: 'admin', password: '1234' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockOnLogin).toHaveBeenCalledWith('admin');
  });

  test('shows alert on invalid credentials', () => {
    const mockOnLogin = jest.fn();
    window.alert = jest.fn(); // Mock alert

    const users = [{ username: 'admin', password: '1234' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials!');
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  test('registers a new user successfully', () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);

    // Switch to Register form
    fireEvent.click(screen.getByText(/register here/i));

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    const users = JSON.parse(localStorage.getItem('users'));
    expect(users).toEqual([{ username: 'newuser', password: 'pass' }]);
    expect(mockOnLogin).toHaveBeenCalledWith('newuser');
  });

  test('shows alert if registering with existing username', () => {
    const mockOnLogin = jest.fn();
    window.alert = jest.fn();

    const users = [{ username: 'existing', password: '123' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(<Login onLogin={mockOnLogin} />);

    // Switch to Register form
    fireEvent.click(screen.getByText(/register here/i));

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'existing' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'any' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(window.alert).toHaveBeenCalledWith('Username already taken!');
    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});
