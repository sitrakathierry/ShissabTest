<?php

namespace AppBundle\Repository;

/**
 * ModelePdfRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ModelePdfRepository extends \Doctrine\ORM\EntityRepository
{
	public function getList(
		$agence,
        $recherche_par,
        $a_rechercher
	)
	{

		$em = $this->getEntityManager();
		
		$query = "	select *
					from modele_pdf mp
					where mp.nom is not null
					";

		if ($agence) {
			$query .= "	and mp.agence = " . $agence ;
		}

		if ($recherche_par == 1) {
			$query .= "	and mp.nom like '%" . $a_rechercher . "%'";
		}

		$query .= "	order by mp.nom asc";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;

	}
}