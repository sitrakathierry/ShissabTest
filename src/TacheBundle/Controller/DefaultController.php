<?php

namespace TacheBundle\Controller;

use AppBundle\Entity\Assignation;
use AppBundle\Entity\HistoTypeTache;
use AppBundle\Entity\Tache;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('TacheBundle:Default:index.html.twig');
    }
    public function addAction()
    {
        $user = $this->getUser();
        $userAgence = $this->getDoctrine()
                    ->getRepository('AppBundle:UserAgence')
                    ->findOneBy(array(
                        'user' => $user
                    ));
        $agence = $userAgence->getAgence();
        $agenceId = $agence->getId() ;

        $basePers = $this->getDoctrine()
                    ->getRepository('AppBundle:Personne')
                    ->getAllPersonne($agenceId);
        
        
        $baseTypeTache = $this->getDoctrine()
                    ->getRepository('AppBundle:TypeTache')
                    ->getAllTypeTache($agenceId);


        return $this->render('TacheBundle:Default:add.html.twig', array(
            "basePers" => $basePers,
            "baseTypeTache" => $baseTypeTache

        ));
    }
    public function consultationAction()
    {
        $user = $this->getUser();
        $userAgence = $this->getDoctrine()
                    ->getRepository('AppBundle:UserAgence')
                    ->findOneBy(array(
                        'user' => $user
                    ));
        $agence = $userAgence->getAgence() ;
        $agenceId = $agence->getId() ; 
        
        $baseTache = $this->getDoctrine()
                    ->getRepository('AppBundle:Tache')
                    ->getAllTache($agenceId);  

        $tabTypeTache = array() ;
        $tabTachePers = array() ;
        $tabCommentTache = array() ;

        foreach ($baseTache as $uneTache) {
            $baseTacheType = $this->getDoctrine()
                    ->getRepository('AppBundle:Tache')
                    ->getAllTacheTypeTache($uneTache["id"]);
                    
            array_push($tabTypeTache,$baseTacheType) ;

            $baseTachePers = $this->getDoctrine()
                    ->getRepository('AppBundle:Tache')
                    ->getAllTachePersonne($uneTache["id"]);
            array_push($tabTachePers,$baseTachePers) ;

            $baseCommnetaire = $this->getDoctrine()
                    ->getRepository('AppBundle:Tache')
                    ->getAllCommentTache($uneTache["id"]);
            
            array_push($tabCommentTache, $baseCommnetaire) ;
        }
                    
        return $this->render('TacheBundle:Default:consultation.html.twig',array(
            'tabTachePers' => $tabTachePers,
            'baseTache' => $baseTache,
            'tabTypeTache' => $tabTypeTache,
            'tabCommentTache' => $tabCommentTache
        ));
    }

    public function saveAction(Request $request)
    {
        // récupérer les informations postés
        $tache = $request->request->get('t_nom');
        $t_pers_assigne = $request->request->get('t_pers_assigne'); // tableau de personne
        $t_date_debut = $request->request->get('t_date_debut');
        $t_date_fin = $request->request->get('t_date_fin');
        $t_duree = $request->request->get('t_duree');
        $t_type_duree = $request->request->get('t_type_duree');
        $t_type_tache = $request->request->get('t_type_tache'); // tableau de type de tâche
        $t_description = $request->request->get('t_description');

        $dateCreation = new \DateTime('now', new \DateTimeZone("+3"));

        // récupérer l'id de l'agence
        $user = $this->getUser();
        $userAgence = $this->getDoctrine()
                    ->getRepository('AppBundle:UserAgence')
                    ->findOneBy(array(
                        'user' => $user
                    ));
        $agence = $userAgence->getAgence();
        $agenceId = $agence->getId() ;

        if(is_numeric($t_duree) &&  $t_duree > 0)
        {
            $tacheEntity = new Tache() ;

            $dateDebut =  new \DateTime($t_date_debut, new \DateTimeZone("+3"));
            $dateFin =  new \DateTime($t_date_fin, new \DateTimeZone("+3"));
    
            $tacheEntity->setTache($tache) ;
            $tacheEntity->setIdAgence($agenceId) ; 
            $tacheEntity->setDateDebut($dateDebut) ;
            $tacheEntity->setDateFin($dateFin) ;
            $tacheEntity->setDuree(intval($t_duree)) ; 
            $tacheEntity->setTypeDuree($t_type_duree) ;
            $tacheEntity->setDescription($t_description) ;

            // Comparer la date debut de tache avec la date en cours
            $date1 = $t_date_debut; 
            $date2 = date("Y-m-d"); 
            $timestamp1 = strtotime($date1); 
            $timestamp2 = strtotime($date2); 
            if ($timestamp1 <= $timestamp2)
                $tacheEntity->setStatut(1) ; // Non commencé
            else
                $tacheEntity->setStatut(0) ; // En Cours

            $tacheEntity->setDateCreatedAt($dateCreation) ;
            $tacheEntity->setIsDelete(NULL) ;

            $em = $this->getDoctrine()->getManager();
            $em->persist($tacheEntity);
            $em->flush();

            $idNew = $tacheEntity->getId() ;
            for ($i=0; $i < count($t_type_tache); $i++) { 
                $histoTypeTache = new HistoTypeTache() ;
                $histoTypeTache->setIdtache($idNew) ;
                $histoTypeTache->setIdtypetache($t_type_tache[$i]) ;
                $histoTypeTache->setDateCreatedAt($dateCreation) ;
                $em->persist($histoTypeTache);
                $em->flush();
            }

            for ($j=0; $j < count($t_pers_assigne); $j++) { 
                $assignation = new Assignation() ;
                $assignation->setIdtache($idNew) ;
                $assignation->setIdpersonne($t_pers_assigne[$j]) ;
                $assignation->setDateCreatedAt($dateCreation) ;
                $em->persist($assignation);
                $em->flush();
            }


            return new Response("Succes") ;
        }
        else
        {
            return new Response("Vérifier les champs ") ;
        }




        
    }
}
