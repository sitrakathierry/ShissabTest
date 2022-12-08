<?php

namespace CommercialBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Evenement;
use DateTime;

class EvenementController extends Controller
{
	public function editorAction(Request $request)
    {
        // $id = $request->request->get('id');
        // $banque = $this->getDoctrine()->getRepository('AppBundle:Banque')
        //     ->find($id);
        $client = $this->getDoctrine()->getRepository('AppBundle:Client')->findAll();

        return $this->render('@Commercial/Evenement/editor.html.twig',[
            // 'banque' => $banque,
            'clients' => $client,
        ]);
    }

    public function saveAction(Request $request)
    {
        $id = $request->request->get('id');
        $titre = $request->request->get('title');
        $description = $request->request->get('description');
        $type = $request->request->get('type');
        $date = $request->request->get('start');
        $datestr = $request->request->get('datestr');
        $couleur = $request->request->get('backgroundColor');
        $is_prospect = $request->request->get('is_prospect');
        $id_client = $request->request->get('client');
        $prospect = $request->request->get('prospect');

        $date_heure = explode(' ',  $datestr);
        $client = ($id_client) ? $this->getDoctrine()
            ->getRepository('AppBundle:Client')
            ->find($id_client) : '' ;
        $datef = \DateTime::createFromFormat('j/m/Y',$date_heure[0]);
    
        //var_dump($request->request->all(),$datef->format('d/m/Y'));die();

        if ($id) {
            $evenement = $this->getDoctrine()
                    ->getRepository('AppBundle:Evenement')
                    ->find($id);

            if (!$evenement) {
                $evenement = new Evenement();
            }

        } else {
            $evenement = new Evenement();
        }

        $evenement->setId($id);
        $evenement->setTitre($titre);
        $evenement->setDescription($description);
        $evenement->setType($type);
        $evenement->setDate($datef);
        $evenement->setHeure($date_heure[1]);
        $evenement->setCouleur($couleur);
        ($is_prospect) ? $evenement->setProspect($prospect) : $evenement->setClient($client) ;

        $em = $this->getDoctrine()->getManager();
        $em->persist($evenement);
        $em->flush();

        if ($evenement->getId()) {
            return new Response(200);
        }
        
    }
}
