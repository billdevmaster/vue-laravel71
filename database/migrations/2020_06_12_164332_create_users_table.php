<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('name')->nullable();
			$table->string('first_name')->nullable();
			$table->string('last_name')->nullable();
			$table->string('company_name')->nullable();
			$table->string('email')->nullable();
			$table->string('customer_code')->nullable();
			$table->string('phone')->nullable();
			$table->string('mobile')->nullable();
			$table->string('fax')->nullable();
			$table->date('birthday')->nullable();
			$table->string('eco_ben')->nullable();
			$table->string('password')->nullable();
			$table->boolean('role_id')->nullable()->comment('1: super admin, 2: staff, 3: customer, 4: client');
			$table->boolean('status')->nullable()->default(1);
			$table->string('address')->nullable();
			$table->string('city')->nullable();
			$table->string('country')->nullable();
			$table->string('name_id')->nullable();
			$table->string('id_type')->nullable();
			$table->string('id_number')->nullable();
			$table->dateTime('expire_date')->nullable();
			$table->string('place_birthday')->nullable();
			$table->string('place_issue')->nullable();
			$table->string('national')->nullable();
			$table->string('id_img')->nullable();
			$table->string('company_img')->nullable();
			$table->string('mix_img')->nullable();
			$table->string('ofac')->nullable();
			$table->string('permission')->nullable();
			$table->timestamps();
			$table->string('remember_token', 100)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
