<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ReservationDetails
 *
 * @ORM\Table(name="reservation_details")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ReservationDetailsRepository")
 */
class ReservationDetails
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
     * @var string
     *
     * @ORM\Column(name="tables", type="text", nullable=true)
     */
    private $tables;

    /**
     * @var string
     *
     * @ORM\Column(name="qte", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $qte;

    /**
     * @var string
     *
     * @ORM\Column(name="prix", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $prix;

    /**
     * @var string
     *
     * @ORM\Column(name="total", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $total;

    /**
     * @var \AppBundle\Entity\Plat
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Plat")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="plat", referencedColumnName="id")
     * })
     */
    private $plat;

    /**
     * @var \AppBundle\Entity\Reservation
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Reservation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="reservation", referencedColumnName="id")
     * })
     */
    private $reservation;

    /**
     * @var string
     *
     * @ORM\Column(name="accompagnements", type="text", nullable=true)
     */
    private $accompagnements;

    private $accompagnementsList;

    private $totalAccompagnement;

    /**
     * @var integer
     *
     * @ORM\Column(name="statut", type="integer", nullable=true)
     */
    private $statut = 1;

    /**
     * @var string
     *
     * @ORM\Column(name="cuisson", type="text", nullable=true)
     */
    private $cuisson;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set tables
     *
     * @param string $tables
     *
     * @return ReservationDetails
     */
    public function setTables($tables)
    {
        $this->tables = $tables;

        return $this;
    }

    /**
     * Get tables
     *
     * @return string
     */
    public function getTables()
    {
        return $this->tables;
    }

    /**
     * Set qte
     *
     * @param string $qte
     *
     * @return ReservationDetails
     */
    public function setQte($qte)
    {
        $this->qte = $qte;

        return $this;
    }

    /**
     * Get qte
     *
     * @return string
     */
    public function getQte()
    {
        return $this->qte;
    }

    /**
     * Set prix
     *
     * @param string $prix
     *
     * @return ReservationDetails
     */
    public function setPrix($prix)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix
     *
     * @return string
     */
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * Set total
     *
     * @param string $total
     *
     * @return ReservationDetails
     */
    public function setTotal($total)
    {
        $this->total = $total;

        return $this;
    }

    /**
     * Get total
     *
     * @return string
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * Set plat
     *
     * @param \AppBundle\Entity\Plat $plat
     *
     * @return ReservationDetails
     */
    public function setPlat(\AppBundle\Entity\Plat $plat = null)
    {
        $this->plat = $plat;

        return $this;
    }

    /**
     * Get plat
     *
     * @return \AppBundle\Entity\Plat
     */
    public function getPlat()
    {
        return $this->plat;
    }

    /**
     * Set reservation
     *
     * @param \AppBundle\Entity\Reservation $reservation
     *
     * @return ReservationDetails
     */
    public function setReservation(\AppBundle\Entity\Reservation $reservation = null)
    {
        $this->reservation = $reservation;

        return $this;
    }

    /**
     * Get reservation
     *
     * @return \AppBundle\Entity\Reservation
     */
    public function getReservation()
    {
        return $this->reservation;
    }

    /**
     * Set statut
     *
     * @param integer $statut
     *
     * @return ReservationDetails
     */
    public function setStatut($statut)
    {
        $this->statut = $statut;

        return $this;
    }

    /**
     * Get statut
     *
     * @return integer
     */
    public function getStatut()
    {
        return $this->statut;
    }

    /**
     * Set accompagnements
     *
     * @param string $accompagnements
     *
     * @return EmporterDetails
     */
    public function setAccompagnements($accompagnements)
    {
        $this->accompagnements = $accompagnements;

        return $this;
    }

    /**
     * Get accompagnements
     *
     * @return string
     */
    public function getAccompagnements()
    {
        return $this->accompagnements;
    }

    public function getAccompagnementsList($value='')
    {
        return $this->accompagnementsList;
    }

    public function setAccompagnementsList($accompagnementsList)
    {
        $this->accompagnementsList = $accompagnementsList;

        return $this;
    }

    public function getTotalAccompagnement($value='')
    {
        return $this->totalAccompagnement;
    }

    public function setTotalAccompagnement($totalAccompagnement)
    {
        $this->totalAccompagnement = $totalAccompagnement;

        return $this;
    }



    /**
     * Set cuisson
     *
     * @param string $cuisson
     *
     * @return ReservationDetails
     */
    public function setCuisson($cuisson)
    {
        $this->cuisson = $cuisson;

        return $this;
    }

    /**
     * Get cuisson
     *
     * @return string
     */
    public function getCuisson()
    {
        return $this->cuisson;
    }
}
