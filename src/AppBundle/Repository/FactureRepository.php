<?php

namespace AppBundle\Repository;

/**
 * FactureRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class FactureRepository extends \Doctrine\ORM\EntityRepository
{
	public function consultation(
		$recherche_par = '',
		$a_rechercher = '',
		$type_date = '', 
		$mois = '', 
		$annee = '', 
		$date_specifique = '', 
		$debut_date = '', 
		$fin_date = '', 
		$par_agence = 0,
		$filtre_modele = 0,
		$filtre_type = 0
	)
	{

		$em = $this->getEntityManager();
		
		$query = "	select f.id as id, IF(f.type = 1,'DEVIS','DEFINITIVE') as type, date_format(f.date_creation,'%d/%m/%Y') as date_creation, date_format(f.date,'%d/%m/%Y') as date, IF(c.statut = 1,cm.nom_societe,cp.nom) as client, CONCAT( IF(f.type = 1, 'PR-','DF-') ,LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) as num_fact, ag.nom as agence, f.modele, f.total, f.montant, f.date_creation as dc, f.num
					from facture f
					left join client c on (f.client = c.num_police)
					left join client_morale cm on (c.id_client_morale = cm.id)
					left join client_physique cp on (c.id_client_physique = cp.id)
					inner join agence ag on (f.agence = ag.id) 
				";
 
		$where = " where f.id is not null";

		if($recherche_par == 1){
			$where .= "	and (cm.nom_societe LIKE '%" . $a_rechercher . "%'";

			$where .= "	or cp.nom LIKE '%" . $a_rechercher . "%')";

			// $where .= "	or f.nom LIKE '%" . $a_rechercher . "%')";
		}

		if ($recherche_par == 2) {
			$where .= " and CONCAT(IF(f.type = 1, 'PR-','DF-'),LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) like '%". $a_rechercher ."%'";
		}

		if ($recherche_par == 3) {
			$where .= " and f.police like '%". $a_rechercher ."%'";
		}

		if ($par_agence != 0) {
			$where .= "	and ag.id = " . $par_agence;
		}

		if ($filtre_type) {
			$where .= " and f.type = ". $filtre_type ;
		}

		if ($filtre_modele) {
			$where .= " and f.modele = ". $filtre_modele ;
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
		$query .= " and f.is_delete IS NULL ";
        $statement = $em->getConnection()->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll();
        return $result;
	}

	public function newNum($id_agence)
	{


		$year = date("y");

		$em = $this->getEntityManager();
		
		$query  = "	SELECT f.num 
					FROM facture f
					where date_format(f.date_creation,'%y') = '$year'
					and f.agence = " .$id_agence;
					
		$query .= "	order by f.id desc
					limit 1";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();



        if (empty($result)) {
        	$newNum = 1;
        	$newNum = str_pad($newNum, 3, '0', STR_PAD_LEFT);
        } else {
	        $last_num = $result[0]['num'];
	        $newNum = intval($last_num) + 1;
	        $newNum = str_pad($newNum, 3, '0', STR_PAD_LEFT);
        }

        return $newNum;

	}

	public function consultationCorbeille(
		$recherche_par = '',
		$a_rechercher = '',
		$type_date = '', 
		$mois = '', 
		$annee = '', 
		$date_specifique = '', 
		$debut_date = '', 
		$fin_date = '', 
		$par_agence = 0,
		$filtre_modele = 0,
		$filtre_type = 0
	)
	{

		$em = $this->getEntityManager();
		
		$query = "	select f.id as id, IF(f.type = 1,'DEVIS','DEFINITIVE') as type, date_format(f.date_creation,'%d/%m/%Y') as date_creation, date_format(f.date,'%d/%m/%Y') as date, IF(c.statut = 1,cm.nom_societe,cp.nom) as client, CONCAT( IF(f.type = 1, 'PR-','DF-') ,LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) as num_fact, ag.nom as agence, f.modele, f.total, f.montant, f.date_creation as dc, f.num
					from facture f
					left join client c on (f.client = c.num_police)
					left join client_morale cm on (c.id_client_morale=cm.id)
					left join client_physique cp on (c.id_client_physique=cp.id)
					inner join agence ag on (f.agence = ag.id)";

		$where = " where f.id is not null";

		if($recherche_par == 1){
			$where .= "	and (cm.nom_societe LIKE '%" . $a_rechercher . "%'";

			$where .= "	or cp.nom LIKE '%" . $a_rechercher . "%')";

			// $where .= "	or f.nom LIKE '%" . $a_rechercher . "%')";
		}

		if ($recherche_par == 2) {
			$where .= " and CONCAT(IF(f.type = 1, 'PR-','DF-'),LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) like '%". $a_rechercher ."%'";
		}

		if ($recherche_par == 3) {
			$where .= " and f.police like '%". $a_rechercher ."%'";
		}

		if ($par_agence != 0) {
			$where .= "	and ag.id = " . $par_agence;
		}

		if ($filtre_type) {
			$where .= " and f.type = ". $filtre_type ;
		}

		if ($filtre_modele) {
			$where .= " and f.modele = ". $filtre_modele ;
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

		$query .= " and f.is_delete = 1 ";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;

	}

	public function findNumFact($numFact)
	{
		
		$em = $this->getEntityManager(); // GESTIONNAIRE D'ENTITE
		$sql = "SELECT CONCAT( IF(f.type = 1, 'PR-','DF-') ,LPAD(f.num, 3, '0'),'/',date_format(f.date_creation,'%y')) as formattedNum,f.*,c.*,cm.*,cp.* FROM `facture` f JOIN client c ON c.num_police = f.client LEFT JOIN client_physique cp ON cp.id = c.id_client_physique LEFT JOIN client_morale cm ON cm.id = c.id_client_morale WHERE f.num = ? " ; // PREPARATION DE LA REQUETE
        $statement = $em->getConnection()->prepare($sql);
        $statement->execute(array($numFact));
        $result = $statement->fetch();
        return $result ; 
	}
}
