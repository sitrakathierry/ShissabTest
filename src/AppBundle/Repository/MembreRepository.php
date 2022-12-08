<?php

namespace AppBundle\Repository;

/**
 * MembreRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class MembreRepository extends \Doctrine\ORM\EntityRepository
{
    public function list($cle)
    {
        $em = $this->getEntityManager();
        
        $query = "  select m.id, m.nom, m.poste, m.img, m.desactive
                    from membre m
                    inner join siteweb si on (m.siteweb = si.id)
                    where m.id is not null ";

        $query .= " and si.cle = '" . $cle . "'";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
    }

    public function details($id)
    {
        $em = $this->getEntityManager();
        
        $query = "  select m.id, m.nom, m.poste, m.img
                    from membre m
                    inner join siteweb si on (m.siteweb = si.id)
                    where m.id is not null ";

        $query .= " and m.id = " . $id ;

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        if (!empty($result)) {
            return $result[0];
        } 

        return [];
    }
}
