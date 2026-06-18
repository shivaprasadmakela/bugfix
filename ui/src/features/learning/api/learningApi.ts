import { supabase } from '../../../shared/supabaseClient';
import type { Course, Lesson, UserProgress, UserProfile } from '../types';

const getAuthHeaders = async (): Promise<HeadersInit> => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const fetchCourses = async (): Promise<Course[]> => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/courses', { headers });
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
};

export const fetchCourseDetails = async (id: number): Promise<Course> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`/api/courses/${id}`, { headers });
    if (!response.ok) throw new Error(`Failed to fetch course ${id} details`);
    return response.json();
};

export const fetchLesson = async (id: number): Promise<Lesson> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`/api/courses/lessons/${id}`, { headers });
    if (!response.ok) throw new Error(`Failed to fetch lesson ${id}`);
    return response.json();
};

export const fetchProgress = async (): Promise<UserProgress[]> => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/progress', { headers });
    if (!response.ok) throw new Error('Failed to fetch progress');
    return response.json();
};

export const completeLesson = async (id: number): Promise<UserProgress> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`/api/progress/complete/${id}`, {
        method: 'POST',
        headers
    });
    if (!response.ok) throw new Error(`Failed to complete lesson ${id}`);
    return response.json();
};

export const submitQuizScore = async (id: number, score: number): Promise<UserProgress> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`/api/progress/quiz/${id}?score=${score}`, {
        method: 'POST',
        headers
    });
    if (!response.ok) throw new Error(`Failed to submit quiz score for lesson ${id}`);
    return response.json();
};

export const resetProgress = async (): Promise<void> => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/progress/reset', {
        method: 'POST',
        headers
    });
    if (!response.ok) throw new Error('Failed to reset progress');
};

export const fetchProfile = async (): Promise<UserProfile> => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/profile', { headers });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
};

export const updateProfile = async (profile: UserProfile): Promise<UserProfile> => {
    const authHeaders = await getAuthHeaders();
    const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
            ...authHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
};
