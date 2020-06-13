<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('name')->nullable();
			$table->integer('customer_id')->nullable();
			$table->integer('currency_id')->nullable();
			$table->decimal('amount', 65, 5)->nullable();
			$table->decimal('rate', 65, 5)->nullable();
			$table->decimal('total', 65, 0)->nullable();
			$table->decimal('paid_by_client', 65, 5)->nullable();
			$table->decimal('return_to_client', 65, 5)->nullable();
			$table->decimal('description', 65, 5)->nullable();
			$table->decimal('profit', 65, 5)->nullable();
			$table->boolean('type')->nullable()->comment('0: sell
1: buy
');
			$table->decimal('last_avg_rate', 65, 5)->nullable();
			$table->decimal('current_balance', 65, 5)->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('transactions');
	}

}
