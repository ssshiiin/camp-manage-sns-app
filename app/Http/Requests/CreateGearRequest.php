<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class CreateGearRequest extends FormRequest
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
            'gear_name' => 'required|string|max:16',
            'category' => 'required|string|max:16',
            'brand' => 'nullable|string|max:16',
            'price' => 'nullable|integer|min:0',
            'amount' => 'nullable|integer|min:0',
            'purchased_day' => 'nullable|string',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:1024',
        ];
    }

    public function attributes()
    {
        return [
            'gear_name' => 'ギア',
            'category' => 'カテゴリー',
            'brand' => 'メーカー',
            'price' => '購入価格',
            'amount' => '所持数',
            'purchased_day' => '購入日',
            'img' => '写真'
        ];
    }

    protected function failedValidation( Validator $validator ){
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException( response()->json( $response, 422 ));
    }
}
