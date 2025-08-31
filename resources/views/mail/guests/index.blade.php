<x-mail::message>
# Hello {{ $email }}

This is a sample verification message to a guest user

<x-mail::button :url="''">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
