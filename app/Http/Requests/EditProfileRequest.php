<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditProfileRequest extends FormRequest
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
            'app_name' => 'required | string | max:16',
            'profile' => 'nullable | string | max:256',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
        ];
    }

    public function attributes()
    {
        return [
            'app_name' => 'ユーザー名',
            'profile' => 'profile',
            'img' => 'アイコン'
        ];
    }

    protected function failedValidation( Validator $validator ){
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException( response()->json( $response, 422 ));
    }
}
