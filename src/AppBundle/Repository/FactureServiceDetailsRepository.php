<?php

namespace AppBundle\Repository;

/**
 * FactureServiceDetailsRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class FactureServiceDetailsRepository extends \Doctrine\ORM\EntityRepository
{
    public function recette(
        $recherche_par = '',
        $a_rechercher = '',
        $type_date = '',
        $mois = '',
        $annee = '',
        $date_specifique = '',
        $debut_date = '',
        $fin_date = '',
        $par_agence = 0
    )
    {
        $em = $this->getEntityManager();

        $query = "  select date_format(f.date_creation,'%d/%m/%Y') as date_creation, date_format(f.date,'%d/%m/%Y') as date, IF(c.statut = 1,cm.nom_societe,cp.nom) as client, CONCAT( IF(f.type = 1, 'PR-','DF-') ,LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) as num_fact, fsd.montant as total, s.nom as service
                    from facture_service_details fsd
                    inner join facture_service fs on (fsd.facture_service = fs.id)
                    inner join facture f on (fs.facture = f.id)
                    inner join service s on (fsd.service = s.id)
                    left join client c on (f.client = c.num_police)
                    left join client_morale cm on (c.id_client_morale=cm.id)
                    left join client_physique cp on (c.id_client_physique=cp.id)
                    inner join agence ag on (f.agence = ag.id)
                    ";

        $where = " where f.id is not null";

        $where .= " and f.type = 2";

        if($recherche_par == 1){
            $where .= " and (cm.nom_societe LIKE '%" . $a_rechercher . "%'";

            $where .= " or cp.nom LIKE '%" . $a_rechercher . "%')";

            // $where .= "  or f.nom LIKE '%" . $a_rechercher . "%')";
        }

        if ($recherche_par == 2) {
            $where .= " and CONCAT(IF(f.type = 1, 'PR-','DF-'),LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) like '%". $a_rechercher ."%'";
        }

        if ($recherche_par == 3) {
            $where .= " and f.police like '%". $a_rechercher ."%'";
        }

        if ($par_agence != 0) {
            $where .= " and ag.id = " . $par_agence;
        }

        if ($type_date) {
            switch ($type_date) {
                case '1':
                    $now = new \DateTime();
                    $dateNow = $now->format('d-m-Y');
                    $where .= " and date_format(f.date_creation,'%d-%m-%Y') = '" . $dateNow ."'";
                    break;
                
                case '2':
                    $moisAnnee = $mois . "-" . $annee;
                    $where .= " and date_format(f.date_creation,'%m-%Y') = '" . $moisAnnee ."'";
                    break;

                case '3':
                    $where .= " and date_format(f.date_creation,'%Y') = '" . $annee ."'";
                    break;

                case '4':
                    // $date = \DateTime::createFromFormat('j/m/Y', $date_specifique);
                    $where .= " and date_format(f.date_creation,'%d/%m/%Y') = '" . $date_specifique ."'";
                    break;

                case '5':
                    $where .= " and date_format(f.date_creation,'%d/%m/%Y') >= '" . $debut_date ."'";
                    $where .= " and date_format(f.date_creation,'%d/%m/%Y') <= '" . $fin_date ."'";
                    break;
            }
        }

        $query .= $where;
        $statement = $em->getConnection()->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll();
        return $result;
    }

    // public function getAllDetailsSerivce($idFacture)
    // {
    //     $query = "SELECT fsd.designation FROM `facture_service_details` fsd 
	// 	    JOIN facture_service fs ON fs.id = fsd.facture_service
    //     LEFT JOIN facture f ON f.id = fs.facture
    //     WHERE f.id = ? ";
    //     $em = $this->getEntityManager();
    //     $statement = $em->getConnection()->prepare($query);
    //     $statement->execute(array($idFacture));
    //     $result = $statement->fetchAll();
    //     return $result;
    // }
}
