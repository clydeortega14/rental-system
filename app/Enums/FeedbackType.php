<?php
//necessary for feedback
namespace App\Enums;

enum FeedbackType: string
{
    case BUG = 'bug';
    case SUGGESTION = 'suggestion';
    case COMPLIMENT = 'compliment';
    //added static function for ts
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
    public function label(): string
    {
        return match($this) {
            self::BUG => 'Bug Report',
            self::SUGGESTION => 'Suggestion',
            self::COMPLIMENT => 'Compliment',
        };
    }
}