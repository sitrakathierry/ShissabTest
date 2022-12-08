<?php

namespace AppBundle\Repository;

/**
 * ClientRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ClientRepository extends \Doctrine\ORM\EntityRepository
{

	public function checkPhysique($param)
	{
		$em = $this->getEntityManager();

		$query = "	select c.num_police
					from client c
					inner join client_physique cp on (c.id_client_physique = cp.id)";

		$query .= "	where UPPER(cp.nom) = '" . $param['nom'] . "'";

		$query .= "	and c.agence = " . $param['agence'];

		$query .= "	limit 1";

        $statement = $em->getConnection()->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll();

        if (!empty($result)) {
        	return $result[0]['num_police'];
        }

        return false;

	}

	public function checkMorale($param)
	{
		$em = $this->getEntityManager();

		$query = "	select c.num_police
					from client c
					inner join client_morale cm on (c.id_client_morale = cm.id)";

		$query .= "	where UPPER(cm.nom_societe) = '" . $param['nomSociete'] . "'";

		$query .= "	and c.agence = " . $param['agence'];

		$query .= "	limit 1";

        $statement = $em->getConnection()->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll();

        if (!empty($result)) {
        	return $result[0]['num_police'];
        }

        return false;

	}

	public function liste($statut,$agence)
	{

		$em = $this->getEntityManager();

		if ($statut == 0) {
			$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, IF(c.statut = 1,cm.nom_societe,cp.nom) as nom, IF(c.statut = 1,'CLIENT MORALE','CLIENT PHYSIQUE') as statut, a.code as code_agence, a.nom as agence, IF(c.statut = 1,cm.adresse,cp.adresse) as adresse, IF(c.statut = 1,cm.tel_fixe,cp.tel) as tel
						from client c
						inner join agence a on (c.agence = a.id)
						left join client_morale cm on (c.id_client_morale = cm.id)
						left join client_physique cp on (c.id_client_physique = cp.id)";
		} else {
			if ($statut == 1) {
				$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, cm.nom_societe as nom, 'CLIENT MORALE' as statut, a.code as code_agence, a.nom as agence, cm.tel_fixe as tel, cm.adresse
							from client c
							inner join agence a on (c.agence = a.id)
							inner join client_morale cm on (c.id_client_morale = cm.id)";
			} else {
				$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, cp.nom as nom, 'CLIENT PHYSIQUE' as statut, a.code as code_agence, a.nom as agence, cp.adresse, cp.tel
							from client c
							inner join agence a on (c.agence = a.id)
							inner join client_physique cp on (c.id_client_physique = cp.id)";
			}
		}

		$where = "";

		if ($agence != 0) {
			$where .= "	where a.id = " . $agence;
		}

		$query .= $where;

		if ($statut == 0) {
			$query .= "	order by cm.nom_societe ASC,cp.nom ASC";
		} else {
			if ($statut == 1) {
			$query .= "	order by cm.nom_societe ASC";	
		} else {
			$query .= "	order by cp.nom ASC";
			}
		}

		// var_dump($query);die();

		

        $statement = $em->getConnection()->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll();
        return $result;

	}

	public function listByNom($statut,$nom,$agence)
	{
		$em = $this->getEntityManager();

		if ($statut == 0) {
			$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, IF(c.statut = 1,cm.nom_societe,cp.nom) as nom, IF(c.statut = 1,'CLIENT MORALE','CLIENT PHYSIQUE') as statut, a.code as agence, IF(c.statut = 1,cm.adresse,cp.adresse) as adresse, IF(c.statut = 1,cm.tel_fixe,cp.tel) as tel
						from client c
						inner join agence a on (c.agence = a.id)
						left join client_morale cm on (c.id_client_morale = cm.id)
						left join client_physique cp on (c.id_client_physique = cp.id)";

				$where = "	where (cm.nom_societe LIKE '%" . $nom . "%'";

				$where .= "	or cp.nom LIKE '%" . $nom . "%')";

				if ($agence != 0) {
					$where .= "	and a.id = " . $agence;
				}

				$query .= $where;
				$query .= "	order by cm.nom_societe ASC,cp.nom ASC";
		} else {

			if ($statut == 1) {
				$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, 'CLIENT MORALE' as statut, cm.nom_societe as nom, a.code as code_agence, a.nom as agence
							from client c
							inner join agence a on (c.agence = a.id)
							inner join client_morale cm on (c.id_client_morale = cm.id)";

				$where = "	where cm.nom_societe LIKE '%" . $nom . "%'";

				if ($agence != 0) {
					$where .= "	and a.id = " . $agence;
				}

				$query .= $where;
				$query .= "	order by cm.nom_societe ASC";

			} else {
				$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, 'CLIENT PHYSIQUE' as statut, cp.nom as nom, a.code as code_agence, a.nom as agence
							from client c
							inner join agence a on (c.agence = a.id)
							inner join client_physique cp on (c.id_client_physique = cp.id)";

				$where = "	where cp.nom LIKE '%" . $nom . "%'";

				if ($agence != 0) {
					$where .= "	and a.id = " . $agence;
				}

				$query .= $where;
				$query .= "	order by cp.nom ASC";
			}
		}

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
	}

	public function listByNPolice($statut,$num, $agence = 0)
	{
		$em = $this->getEntityManager();

		if ($statut == 0) {
			$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, IF(c.statut = 1,cm.nom_societe,cp.nom) as nom, IF(c.statut = 1,'CLIENT MORALE','CLIENT PHYSIQUE') as statut, a.code as code_agence, a.nom as agence, IF(c.statut = 1,cm.adresse,cp.adresse) as adresse, IF(c.statut = 1,cm.tel_fixe,cp.tel) as tel
						from client c
						inner join agence a on (c.agence = a.id)
						left join client_morale cm on (c.id_client_morale = cm.id)
						left join client_physique cp on (c.id_client_physique = cp.id)";

			$where = "	where LPAD(c.num_police, 6, '0') LIKE '%" . $num . "%'";

			if ($agence != 0) {
				$where .= "	and a.id = " . $agence;
			}

			$query .= $where;
			$query .= "	order by cm.nom_societe ASC,cp.nom ASC";

		} else {

			if ($statut == 1) {
				$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, 'CLIENT MORALE' as statut, cm.nom_societe as nom, a.code as code_agence, a.nom as agence
							from client c
							inner join agence a on (c.agence = a.id)
							inner join client_morale cm on (c.id_client_morale = cm.id)";

				$where = "	where c.num_police LIKE '%" . intval($num) . "%'";
				if ($agence != 0) {
					$where .= "	and a.id = " . $agence;
				}
				$query .= $where;
				$query .= "	order by cm.nom_societe ASC";
			} else {
				$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, 'CLIENT PHYSIQUE' as statut, cp.nom as nom, a.code as code_agence, a.nom as agence
							from client c
							inner join agence a on (c.agence = a.id)
							inner join client_physique cp on (c.id_client_physique = cp.id)";

				$where = "	where c.num_police LIKE '%" . intval($num) . "%'";
				if ($agence != 0) {
					$where .= "	and a.id = " . $agence;
				}

				$query .= $where;
				$query .= "	order by cp.nom ASC";
			}
		}

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
	}

	public function details($id)
	{
		$em = $this->getEntityManager();
		
		$query = "	select c.num_police as id, LPAD(c.num_police, 6, '0') as num_police, IF(c.statut = 1,cm.nom_societe,cp.nom) as nom, IF(c.statut = 1,'CLIENT MORALE','CLIENT PHYSIQUE') as statut, a.code as code_agence, a.nom as agence, IF(c.statut = 1, cm.adresse, cp.adresse) as adresse, cp.profession, IF(c.statut = 2, format(cp.ddn,'%d/%m/%Y'),'') as ddn, cp.ldn
					from client c
					inner join agence a on (c.agence = a.id)
					left join client_morale cm on (c.id_client_morale = cm.id)
					left join client_physique cp on (c.id_client_physique = cp.id)
					where c.num_police = " . $id;

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result[0];
	}
}