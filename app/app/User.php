<?php

namespace App;
use Eloquent;
use Illuminate\Support\Facades\Hash;

class User extends Eloquent
{
    protected $fillable = [
        'username', 'password_hash', 'search_radius_km', 'longitude', 'latitude',
    ];
	public $timestamps = false;
	
	protected $table = 'user';
	
	public function roles()
	{
	   return $this->belongsToMany(Role::class, 'user_role');
	}
	
	public static function generateSaltedHash($password) {
		return Hash::make($password);
	}
}
