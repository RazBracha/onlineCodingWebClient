import { v4 as newGuid } from 'uuid';

export function getUserId() {
    const userIdFromStorage = localStorage.getItem('userId')
    if (userIdFromStorage) {
        return userIdFromStorage
    }
    const userId = newGuid()
    localStorage.setItem('userId', userId)
    return userId
}