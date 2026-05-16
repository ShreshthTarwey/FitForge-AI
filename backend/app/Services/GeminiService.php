<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
    }

    public function generateInsight($prompt)
    {
        if (empty($this->apiKey)) {
            return "AI feature disabled: Missing API Key.";
        }

        try {
            $response = Http::post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                return $response->json('candidates.0.content.parts.0.text') ?? "No insight generated.";
            }

            return "AI Coach is currently taking a rest. (API Error)";
        } catch (\Exception $e) {
            return "AI Coach is currently offline.";
        }
    }
}
