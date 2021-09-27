<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'place' => 'required | string | max:16',
            'content' => 'nullable | string | max:256',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:8196',
        ];
    }

    public function attributes()
    {
        return [
            'place' => 'キャンプ場',
            'content' => 'キャプション',
            'img' => '写真'
        ];
    }

    protected function failedValidation( Validator $validator ){
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException( response()->json( $response, 422 ));
    }
}
