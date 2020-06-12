<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCurrenciesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('currencies', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('name')->nullable();
			$table->string('code')->nullable();
			$table->string('buy_code')->nullable();
			$table->string('sell_code')->nullable();
			$table->decimal('buy_rate_from', 65, 5)->nullable();
			$table->decimal('buy_rate_to', 65, 5)->nullable();
			$table->decimal('sell_rate_from', 65, 5)->nullable();
			$table->decimal('sell_rate_to', 65, 5)->nullable();
			$table->decimal('current_balance', 65, 5)->nullable();
			$table->decimal('opening_balance', 65, 5)->nullable();
			$table->decimal('opening_avg_rate', 65, 5)->nullable();
			$table->decimal('last_avg_rate', 65, 5)->nullable();
			$table->enum('calc_type', array('Multiplication','Division','Special'))->nullable();
			$table->integer('bs_amount_dec_limit')->nullable();
			$table->integer('avg_rate_dec_limit')->nullable();
			$table->integer('balance_dec_limit')->nullable();
			$table->integer('last_avg_rate_dec_limit')->nullable();
			$table->string('flag_img')->nullable();
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
		Schema::drop('currencies');
	}

}
