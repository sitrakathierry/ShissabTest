<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TypeTache
 *
 * @ORM\Table(name="type_tache")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TypeTacheRepository")
 */
class TypeTache
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
     * @ORM\Column(name="nom_type_tache", type="string", length=255)
     */
    private $nomTypeTache;

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
     * Set nomTypeTache
     *
     * @param string $nomTypeTache
     *
     * @return TypeTache
     */
    public function setNomTypeTache($nomTypeTache)
    {
        $this->nomTypeTache = $nomTypeTache;

        return $this;
    }

    /**
     * Get nomTypeTache
     *
     * @return string
     */
    public function getNomTypeTache()
    {
        return $this->nomTypeTache;
    }

    /**
     * Set dateCreatedAt
     *
     * @param \DateTime $dateCreatedAt
     *
     * @return TypeTache
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

