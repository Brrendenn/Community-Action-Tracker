<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminEmail = 'nbr4nd0n2005@gmail.com';

        if(! $request->user() || ! $request->user()->email === $adminEmail) {
            return redirect()->route('issues.index')->with('error', 'Access denied.');
        }

        return $next($request);
    }
}
