<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIncomeChangeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('income_change', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->string('serial_number')->nullable();
			$table->dateTime('invoice_date')->nullable();
			$table->integer('user_id')->nullable();
			$table->integer('product_id')->nullable();
			$table->decimal('amount', 11, 5)->nullable();
			$table->text('note', 65535)->nullable();
			$table->dateTime('modify_date')->nullable();
			$table->string('operation_type')->nullable();
			$table->integer('modify_by')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('income_change');
	}

}
