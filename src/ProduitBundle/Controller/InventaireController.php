<?php

namespace ProduitBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class InventaireController extends Controller
{
	public function indexAction()
	{
        $agences  = $this->getDoctrine()
                        ->getRepository('AppBundle:Agence')
                        ->findAll();

        $user = $this->getUser();

        $userAgence = $this->getDoctrine()
                    ->getRepository('AppBundle:UserAgence')
                    ->findOneBy(array(
                        'user' => $user
                    ));
        // $categories  = $this->getDoctrine()
        //                 ->getRepository('AppBundle:CategorieProduit')
        //                 ->findAll();

        $categories = [];

        $agence = $userAgence->getAgence();

        $preference = $this->getDoctrine()
                ->getRepository('AppBundle:PreferenceCategorie')
                ->findOneBy(array(
                    'agence' => $agence
                ));

        if ($preference) {
            $categoriesList = $preference->getCategoriesList();

            foreach ($categoriesList as $id) {
                $item = $this->getDoctrine()
                    ->getRepository('AppBundle:CategorieProduit')
                    ->find($id);
                array_push($categories, $item);
            }
        }

        $entrepots = $this->getDoctrine()
                ->getRepository('AppBundle:Entrepot')
                ->findBy(array(
                    'agence' => $agence
                ));

        $userEntrepot = $this->getDoctrine()
                    ->getRepository('AppBundle:UserEntrepot')
                    ->findOneBy(array(
                        'user' => $user
                    ));
        
        return $this->render('ProduitBundle:Inventaire:index.html.twig', array(
            'agences' => $agences,
            'userAgence' => $userAgence,
            'categories' => $categories,
            'entrepots' => $entrepots,
            'userEntrepot' => $userEntrepot,
        ));
	}

    public function listAction(Request $request)
    {
        $agence = $request->request->get('agence');
        $entrepot = $request->request->get('entrepot');
        $recherche_par = $request->request->get('recherche_par');
        $a_rechercher = $request->request->get('a_rechercher');
        $categorie = $request->request->get('categorie');

        $results  = $this->getDoctrine()
                        ->getRepository('AppBundle:VariationProduit')
                        ->list(
                        	$agence,
                            $recherche_par,
                            $a_rechercher,
                            $categorie,
                            $entrepot
                        );

        return new JsonResponse($results);
    }
}
