<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Services\GeminiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class AICoachControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_chat_route_requires_authentication(): void
    {
        $response = $this->postJson('/api/ai/chat', [
            'message' => 'Hello',
        ]);

        $response->assertStatus(401);
    }

    public function test_chat_returns_reply_from_gemini_service(): void
    {
        $user = User::factory()->create();

        // Mock GeminiService
        $mockGemini = Mockery::mock(GeminiService::class);
        $mockGemini->shouldReceive('generateInsight')
            ->once()
            ->andReturn('Hello! I am your AI Coach. Keep pushing your limits!');

        $this->app->instance(GeminiService::class, $mockGemini);

        $response = $this->actingAs($user)
            ->postJson('/api/ai/chat', [
                'message' => 'What is my plan for today?',
                'history' => [
                    ['sender' => 'bot', 'text' => 'Salutations! I am your coach.'],
                ],
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'reply' => 'Hello! I am your AI Coach. Keep pushing your limits!',
            ]);
    }

    public function test_chat_respects_user_date_header(): void
    {
        $user = User::factory()->create();

        $mockGemini = Mockery::mock(GeminiService::class);
        $mockGemini->shouldReceive('generateInsight')
            ->once()
            ->with(Mockery::on(function ($prompt) {
                // Assert prompt contains the date from X-User-Date header
                return str_contains($prompt, 'Date: 2026-05-27');
            }))
            ->andReturn('Date header parsed successfully!');

        $this->app->instance(GeminiService::class, $mockGemini);

        $response = $this->actingAs($user)
            ->withHeader('X-User-Date', '2026-05-27')
            ->postJson('/api/ai/chat', [
                'message' => 'Analyze my logs today.',
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'reply' => 'Date header parsed successfully!',
            ]);
    }
}
