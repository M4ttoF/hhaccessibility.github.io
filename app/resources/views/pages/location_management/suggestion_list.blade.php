@extends('layouts.default')
@section('content')
<div class="suggestion-list">
	<div class="text-center">
		<h1><a href="/location/management/my-locations">Suggestions for {{ $name }}</a></h1>
	</div>
	@if ( count($suggestions) === 0 )
		<p class="text-center">There is no suggestions about this location.</p>
	@else
	<div class="list-group">
		@foreach($suggestions as $suggestion)
		<a href="/suggestion-detail/{{ $suggestion->id }}" class="list-group-item" title="Click to check details">
			<span class="username">Submitted by: {{ $suggestion->user_name }}</span>
			<span class="when_generated">{{ $suggestion->when_generated }}</span>
		</a>
		@endforeach
	</div>
	@endif
	
</div>
@stop