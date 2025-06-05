<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Rating;

class NewRatingReceived extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Rating $rating)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        //booking.show might not be defined
        return (new MailMessage)
                ->subject('New Rating Received')
                ->line('You received a new '.$this->rating->rating.'★ rating!')
                ->action('View Rating', route('bookings.show', $this->rating->booking))
                ->line('Thank you for using our platform!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
           'rating_id' => $this->rating->id,
            'message' => 'You received a new '.$this->rating->rating.'★ rating',
            'link' => route('bookings.show', $this->rating->booking)
        ];
    }
}