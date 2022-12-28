<?php

namespace AppBundle\Repository;

/**
 * VariationProduitRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class VariationProduitRepository extends \Doctrine\ORM\EntityRepository
{
    public function list(
        $agence,
        $recherche_par = '',
        $a_rechercher = '',
        $categorie = '',
        $entrepot = 0
    )
    {
        $em = $this->getEntityManager();

        $query = "  select vp.id, p.nom, vp.prix_vente, p.id as produit_id, vp.stock, cp.nom as categorie, (vp.prix_vente * vp.stock) as total, p.code_produit, e.nom as entrepot, pe.indice
                    from variation_produit vp
                    inner join produit_entrepot pe on (vp.produit_entrepot = pe.id)
                    inner join produit p on (pe.produit = p.id)
                    left join entrepot e on (pe.entrepot = e.id)
                    inner join agence ag on (p.agence = ag.id)
                    inner join categorie_produit cp on (p.categorie_produit = cp.id)
                    where vp.stock > 0";

        $query .= " and ag.id = " . $agence;

        if ($entrepot) {
            $query .= " and e.id = " . $entrepot ;
        }

        if ($categorie) {
            $query .= " and cp.id = " . $categorie ;
        }

        if ($a_rechercher) {
            if ($recherche_par == 0) {
                $query .= " and p.code_produit like '".$a_rechercher."%'";
            }
            else
            {
                $query .= " and p.nom like '%".$a_rechercher."%'" ;
            }
        }



        $query .= " and p.is_delete IS NULL";

        // $query .= " order by p.nom ASC";

        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        return $result;
    }

    public function getInfoVariation($id)
    {
        $em = $this->getEntityManager();

        $sql ="SELECT * FROM `variation_produit` WHERE `id` = ? " ;
        $statement = $em->getConnection()->prepare($sql);
        $statement->execute([$id]);
        $result = $statement->fetch();
        return $result ; 
    }


    public function mettreAjourTable()
    {
        $em = $this->getEntityManager(); // GESTIONNAIRE D'ENTITE
        $sql = "ALTER TABLE `variation_produit` ADD `produitId` INT NULL AFTER `produit_entrepot`" ; // PREPARATION DE LA REQUETE
        $statement = $em->getConnection()->prepare($sql);
        $statement->execute(array());
        // return $this ;
    }

    public function getProduitEntrepotNotNull()
    {
        $em = $this->getEntityManager(); // GESTIONNAIRE D'ENTITE
        $sql = "SELECT * FROM `variation_produit` WHERE `produit_entrepot` IS NOT NULL" ; // PREPARATION DE LA REQUETE
        $statement = $em->getConnection()->prepare($sql);
        $statement->execute(array());
        $result = $statement->fetchAll();
        return $result ; 
    }

    public function updateProduitId($produitId,$produitEnt)
    {
        $em = $this->getEntityManager(); // GESTIONNAIRE D'ENTITE
        $sql = "UPDATE `variation_produit` SET `produitId` = ? WHERE `produit_entrepot` = ?" ; // PREPARATION DE LA REQUETE
        $statement = $em->getConnection()->prepare($sql); // PREPARER LA REQUETE
        $statement->execute(array($produitId,$produitEnt)); // APPLIQUER LAS PARAMETRES DE LA REQUETE
    }

    public function getTotalVariationProduit($idAgence, $idProduit)
    {
        $em = $this->getEntityManager(); // GESTIONNAIRE D'ENTITE
        $sql = "SELECT SUM(variation_produit.stock) stockG FROM `variation_produit` JOIN produit_entrepot ON produit_entrepot.id = variation_produit.produit_entrepot JOIN entrepot ON entrepot.id = produit_entrepot.entrepot WHERE entrepot.agence = ? AND produit_entrepot.produit = ? AND variation_produit.is_delete IS NULL" ; // PREPARATION DE LA REQUETE
        $statement = $em->getConnection()->prepare($sql);
        $statement->execute(array($idAgence,$idProduit));
        $result = $statement->fetch();
        return $result ; 
    }

    public function getVariationProduit($idAgence, $idProduit)
    {
        $em = $this->getEntityManager(); // GESTIONNAIRE D'ENTITE
        $sql = "SELECT SUM(variation_produit.stock) stockG FROM `variation_produit` JOIN produit_entrepot ON produit_entrepot.id = variation_produit.produit_entrepot JOIN entrepot ON entrepot.id = produit_entrepot.entrepot WHERE entrepot.agence = ? AND produit_entrepot.produit = ? AND variation_produit.is_delete IS NULL" ; // PREPARATION DE LA REQUETE
        $statement = $em->getConnection()->prepare($sql);
        $statement->execute(array($idAgence,$idProduit));
        $result = $statement->fetchAll();
        return $result ; 
    }
}
