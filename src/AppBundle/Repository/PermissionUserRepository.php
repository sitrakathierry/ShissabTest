<?php

namespace AppBundle\Repository;

/**
 * PermissionUserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PermissionUserRepository extends \Doctrine\ORM\EntityRepository
{
	public function getList($user_id)
	{

		$em = $this->getEntityManager();
		
		$query = "	select pu.permission
					from permission_user pu
					inner join fos_user u on (pu.user = u.id)
					where u.id = " . $user_id;

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        if ($result) {
        	return json_decode($result[0]['permission']);
        }

        $default = array(
        	'client' => (Object)array(
        		'create' => false,
        		'edit' => false,
        		'delete' => false
        	),
        	'facture' => (Object)array(
        		'create' => false,
        		'edit' => false,
        		'delete' => false
        	),
                'cotation' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
                'assurance_auto' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
                'assurance_maladie' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
                'sinistre' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
                'caisse' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
                'comptabilite' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
                'iard' => (Object)array(
                        'create' => false,
                        'edit' => false,
                        'delete' => false
                ),
        	
        );

        return (Object)$default;

	}
}
