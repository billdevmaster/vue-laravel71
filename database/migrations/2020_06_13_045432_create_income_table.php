<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIncomeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('income', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('serial_number')->nullable();
			$table->integer('user_id')->nullable();
			$table->integer('product_id')->nullable();
			$table->decimal('amount', 65, 5)->nullable();
			$table->text('note', 65535)->nullable();
			$table->dateTime('create_date')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('income');
	}

}
