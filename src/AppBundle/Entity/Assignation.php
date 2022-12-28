<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Assignation
 *
 * @ORM\Table(name="assignation")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\AssignationRepository")
 */
class Assignation
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
     * @var int
     *
     * @ORM\Column(name="idtache", type="integer")
     */
    private $idtache;

    /**
     * @var int
     *
     * @ORM\Column(name="idpersonne", type="integer")
     */
    private $idpersonne;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_created_at", type="datetime")
     */
    private $dateCreatedAt;


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
     * Set idtache
     *
     * @param integer $idtache
     *
     * @return Assignation
     */
    public function setIdtache($idtache)
    {
        $this->idtache = $idtache;

        return $this;
    }

    /**
     * Get idtache
     *
     * @return int
     */
    public function getIdtache()
    {
        return $this->idtache;
    }

    /**
     * Set idpersonne
     *
     * @param integer $idpersonne
     *
     * @return Assignation
     */
    public function setIdpersonne($idpersonne)
    {
        $this->idpersonne = $idpersonne;

        return $this;
    }

    /**
     * Get idpersonne
     *
     * @return int
     */
    public function getIdpersonne()
    {
        return $this->idpersonne;
    }

    /**
     * Set dateCreatedAt
     *
     * @param \DateTime $dateCreatedAt
     *
     * @return Assignation
     */
    public function setDateCreatedAt($dateCreatedAt)
    {
        $this->dateCreatedAt = $dateCreatedAt;

        return $this;
    }

    /**
     * Get dateCreatedAt
     *
     * @return \DateTime
     */
    public function getDateCreatedAt()
    {
        return $this->dateCreatedAt;
    }
}

