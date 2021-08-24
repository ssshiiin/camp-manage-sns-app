<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <form action="api/create/post/{{Auth::id()}}" method="POST" enctype="multipart/form-data">
        @csrf
        <label>
            image : <input type="file" name="image[]" multiple /><br />
            place : <input type="text" name="place"/><br />
            day : <input type="date" name="day"/><br />
            content : <textarea name="content"></textarea>
        </label>
        <input class="postSubmit" type="submit" value="保存">
    </form>
</body>
</html>
