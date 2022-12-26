<?php

namespace TacheBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('TacheBundle:Default:index.html.twig');
    }
    public function addAction()
    {
        return $this->render('TacheBundle:Default:add.html.twig');
    }
    public function consultationAction()
    {
        return $this->render('TacheBundle:Default:consultation.html.twig');
    }
}
