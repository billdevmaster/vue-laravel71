<?php

namespace App\Http\Controllers\Api\V1;

use App\Product;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Http\Request;



class ProductController extends Controller
{
    public function index()
    {
        return new ProductResource(Product::with([])->get());
    }

    public function show($id)
    {
        if ($id == "active")
            $product = Product::where('status', 1)->get();
        else
            $product = Product::with([])->findOrFail($id);

        return new ProductResource($product);
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response(null, 204);
    }
}
