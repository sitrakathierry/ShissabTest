<?php

namespace AppBundle\Repository;

/**
 * ProduitDeduitRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProduitDeduitRepository extends \Doctrine\ORM\EntityRepository
{

	public function getList($agence)
	{
		$em = $this->getEntityManager();
		$query = "	select p.id, p.code_produit, p.nom, pd.stock, pd.cause, cp.nom as categorie
					from produit_deduit pd 
					left join produit p on (pd.produit = p.id)
					left join categorie_produit cp on (p.categorie_produit = cp.id)
					where p.nom is not null ";

		if ($agence) {
			$query .= "	and p.agence = " . $agence ;
		}

		$query .= "	and p.is_delete IS NULL";
		
		$query .= "	order by p.nom asc";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
	}

}
