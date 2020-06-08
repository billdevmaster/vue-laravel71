<?php

namespace App\Http\Controllers\Api\V1;

use App\Customer;
use App\Http\Controllers\Controller;
use App\Http\Resources\Customer as CustomerResource;
use App\Http\Requests\Admin\UpdateCompaniesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index()
    {
        return new CustomerResource(Customer::where('role_id', 3)->get());
    }

    public function show($id)
    {
        $customer = Customer::with([])->findOrFail($id);

        return new CustomerResource($customer);
    }

    public function store(Request $request)
    {
        request()->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|max:255',
            'id_img' => 'required|image|max:2048',
            'company_img' => 'required|image|max:2048',
            'mix_img' => 'required|image|max:2048',
        ]);

        $id_image = $request->file('id_img');
        $id_image_new_name = rand() . '.' . $id_image->getClientOriginalExtension();
        $id_image->move(public_path('images/users'), $id_image_new_name);
            
        $company_image = $request->file('company_img');
        $company_image_new_name = rand() . '.' . $id_image->getClientOriginalExtension();
        $company_image->move(public_path('images/users'), $company_image_new_name);

        $mix_image = $request->file('mix_img');
        $mix_image_new_name = rand() . '.' . $mix_image->getClientOriginalExtension();
        $mix_image->move(public_path('images/users'), $mix_image_new_name);

        $request_data = array(
            'first_name' => $request->get('first_name'),
            'last_name'=> $request->get('last_name'),
            'email'=> $request->get('email'),
            'password'=> Hash::make($request->get('password')),
            'company_name'=>$request->get('company'),
            'mobile'=>$request->get('mobile'),
            'customer_code'=>$request->get('customer_code'),
            'phone'=>$request->get('phone'), 
            'fax'=>$request->get('fax'), 
            'birthday'=>$request->get('birthday'), 
            'eco_ben'=>$request->get('eco_ben'),
            'address'=>$request->get('address'),
            'city'=>$request->get('city'),
            'country'=>$request->get('country'),
            'name_id'=>$request->get('name_id'),
            'id_type'=>$request->get('id_type'),
            'id_number'=>$request->get('id_number'),
            'place_issue'=>$request->get('place_issue'),
            'place_birthday'=>$request->get('place_birthday'),
            'national'=>$request->get('natinoal'),
            'expire_date'=>$request->get('expire_date'),
            'role_id'=> 3,
            'id_img'=>$id_image_new_name,
            'company_img'=>$company_image_new_name,
            'mix_img'=>$mix_image_new_name
        );

        $customer = Customer::create($request_data);

        return (new CustomerResource($customer))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
    
        $customer = Customer::findOrFail($id);

        $id_image_new_name = $customer->id_img;
        $company_image_new_name = $customer->company_img;
        $mix_image_new_name = $customer->mix_img;    

        $id_image = $request->file('id_img');
        $company_image = $request->file('company_img');
        $mix_image = $request->file('mix_img');

        if($id_image != '')
        {
            request()->validate([
                'first_name' => 'required|max:255',
                'last_name' => 'required|max:255',
                'email' => 'required|max:255',
                'id_img' => 'required|image|max:2048',
            ]);

            $id_image_new_name = rand() . '.' . $id_image->getClientOriginalExtension();
            $id_image->move(public_path('images/users'), $id_image_new_name);
        } else if($company_image != '') 
        {
            request()->validate([
                'first_name' => 'required|max:255',
                'last_name' => 'required|max:255',
                'email' => 'required|max:255',
                'company_img' => 'required|image|max:2048',
            ]);

            $company_image_new_name = rand() . '.' . $company_image->getClientOriginalExtension();
            $company_image->move(public_path('images/users'), $company_image_new_name);
        } else if($mix_image != '')
        {
            request()->validate([
                'first_name' => 'required|max:255',
                'last_name' => 'required|max:255',
                'email' => 'required|max:255',
                'company_img' => 'required|image|max:2048',
            ]);

            $mix_image_new_name = rand() . '.' . $mix_image->getClientOriginalExtension();
            $mix_image->move(public_path('images/users'), $mix_image_new_name);
        } else
        {
            request()->validate([
                'first_name' => 'required|max:255',
                'last_name' => 'required|max:255',
                'email' => 'required|max:255',
            ]);
        }

        $form_data = array(
            'first_name' => $request->first_name,
            'last_name'=> $request->last_name,
            'email'=> $request->email,
            'password'=> $request->password != "" && $request->password != null ? Hash::make($request->password) : $customer->password,
            'company_name'=>$request->company,
            'mobile'=>$request->mobile,
            'customer_code'=>$request->customer_code,
            'phone'=>$request->phone, 
            'fax'=>$request->fax, 
            'birthday'=>$request->birthday, 
            'eco_ben'=>$request->eco_ben,
            'address'=>$request->address,
            'city'=>$request->city,
            'country'=>$request->country,
            'name_id'=>$request->name_id,
            'id_type'=>$request->id_type,
            'id_number'=>$request->id_number,
            'place_issue'=>$request->place_issue,
            'place_birthday'=>$request->place_birthday,
            'national'=>$request->natinoal,
            'expire_date'=>$request->expire_date,
            'role_id'=> 3,
            'id_img'=>$id_image_new_name,
            'company_img'=>$company_image_new_name,
            'mix_img'=>$mix_image_new_name
          );

        
        $customer->update($form_data);          
        
        return (new CustomerResource($customer))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response(null, 204);
    }
}
