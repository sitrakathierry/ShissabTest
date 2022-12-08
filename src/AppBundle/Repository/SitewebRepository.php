<?php

namespace AppBundle\Repository;

/**
 * SitewebRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SitewebRepository extends \Doctrine\ORM\EntityRepository
{
    public function list(
        $recherche_par, 
        $a_rechercher
    )
    {
        $em = $this->getEntityManager();
        
        $query = "  select s.id, s.nom, s.description, ag.nom as agence, s.lien
                    from siteweb s
                    inner join agence ag on (s.agence = ag.id)
                    where s.nom is not null ";

        if ($recherche_par == 1) {
            $query .= " and s.nom like '%" . $a_rechercher . "%'";
        }

        if ($recherche_par == 2) {
            $query .= " and s.lien like '%" . $a_rechercher . "%'";
        }

        $query .= " order by s.nom asc";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
    }

    public function details($cle)
    {
        $em = $this->getEntityManager();

        $query = "  select si.id, si.nom, si.description
                    from siteweb si
                    where si.nom is not null ";

        $query .= " and si.cle = '" . $cle . "'";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;

    }

}
