<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FactureService
 *
 * @ORM\Table(name="facture_service")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FactureServiceRepository")
 */
class FactureService
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Facture
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Facture")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="facture", referencedColumnName="id")
     * })
     */
    private $facture;

    /**
     * @var \AppBundle\Entity\BonCommande
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BonCommande")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="bon_commande", referencedColumnName="id")
     * })
     */
    private $bonCommande;

    /**
     * @var int
     *
     * @ORM\Column(name="is_delete", type="integer", nullable=true)
     */
    private $is_delete;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set facture
     *
     * @param \AppBundle\Entity\Facture $facture
     *
     * @return FactureService
     */
    public function setFacture(\AppBundle\Entity\Facture $facture = null)
    {
        $this->facture = $facture;
    
        return $this;
    }

    /**
     * Get facture
     *
     * @return \AppBundle\Entity\Facture
     */
    public function getFacture()
    {
        return $this->facture;
    }

    /**
     * Set bonCommande
     *
     * @param \AppBundle\Entity\BonCommande $bonCommande
     *
     * @return FactureService
     */
    public function setBonCommande(\AppBundle\Entity\BonCommande $bonCommande = null)
    {
        $this->bonCommande = $bonCommande;

        return $this;
    }

    /**
     * Get bonCommande
     *
     * @return \AppBundle\Entity\BonCommande
     */
    public function getBonCommande()
    {
        return $this->bonCommande;
    }

    /**
     * Set isDelete
     *
     * @param integer $isDelete
     *
     * @return Facture
     */
    public function setIsDelete($isDelete)
    {
        $this->is_delete = $isDelete;

        return $this;
    }

    /**
     * Get isDelete
     *
     * @return integer
     */
    public function getIsDelete()
    {
        return $this->is_delete;
    }
}
