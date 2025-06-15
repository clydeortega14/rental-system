import React from 'react';
import { useForm } from '@inertiajs/react';
import { FeedbackType, isFeedbackType } from '@/types/Feedback';

const FeedbackForm = () => {
    const { data, setData, post, processing } = useForm({
        type: FeedbackType.SUGGESTION,
        message: '',
        contact_email: ''
    });

    return (
        <form onSubmit={() => post('/feedback')}>
            <select 
                value={data.type}
                onChange={e => setData('type', e.target.value as FeedbackType)}
                required
            >
                {Object.entries(FeedbackType).map(([key, value]) => (
                    <option key={key} value={value as FeedbackType}>
                        {key.charAt(0). toUpperCase() + key.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>
            
            <textarea
                value={data.message}
                onChange={e => setData('message', e.target.value)}
                required
            />
            
            <input
                type="email"
                value={data.contact_email}
                onChange={e => setData('contact_email', e.target.value)}
                placeholder="Email (optional)"
            />
            
            <button disabled={processing}>
                Submit
            </button>
        </form>
    );
};