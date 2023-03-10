<?php

namespace AppBundle\Repository;

/**
 * StockInterneGeneralRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class StockInterneGeneralRepository extends \Doctrine\ORM\EntityRepository
{
    public function getList(
        $agence, 
        $recherche_par = '', 
        $a_rechercher = ''
    )
    {
        $em = $this->getEntityManager();
        
        $query = "  select s.id, s.nom, s.unite, s.stock, s.portion, l.nom as libelle
                    from stock_interne_general s
                    left join libelle_general l on (s.libelle_general = l.id)
                    where s.nom is not null ";

        if ($agence) {
            $query .= " and s.agence = " . $agence ;
        }

        if ($recherche_par == 1) {
            $query .= " and s.nom like '%" . $a_rechercher . "%'";
        }

        $query .= " order by s.nom asc";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
    }
}
