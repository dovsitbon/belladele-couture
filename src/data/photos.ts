/**
 * Photos d'illustration (licence Unsplash : usage commercial libre, attribution non obligatoire mais affichée).
 * Elles NE représentent PAS les réalisations de l'atelier.
 * Pour les remplacer : déposer les photos de la commerçante dans src/assets/photos/
 * (même nom de fichier) puis passer `illustration` à false et mettre `credit` à null.
 */
import type { ImageMetadata } from 'astro';
import aiguille from '../assets/photos/aiguille.jpg';
import dentelle from '../assets/photos/dentelle.jpg';
import dentellePerlee from '../assets/photos/dentelle-perlee.jpg';
import machineCoudre from '../assets/photos/machine-coudre.jpg';
import marieeFenetre from '../assets/photos/mariee-fenetre.jpg';
import metreCiseaux from '../assets/photos/metre-ciseaux.jpg';
import portantBobines from '../assets/photos/portant-bobines.jpg';
import robeMarieeSuspendue from '../assets/photos/robe-mariee-suspendue.jpg';
import robeSoireeNoire from '../assets/photos/robe-soiree-noire.jpg';
import robeVitrine from '../assets/photos/robe-vitrine.jpg';
import satin from '../assets/photos/satin.jpg';

export type Photo = {
  src: ImageMetadata;
  alt: string;
  credit: { author: string; url: string } | null;
  illustration: boolean;
};

const u = (author: string, id: string) => ({ author, url: `https://unsplash.com/photos/${id}` });

export const photos = {
  dentellePerlee: { src: dentellePerlee, alt: 'Mains boutonnant le dos en dentelle perlée d’une robe de mariée', credit: u('Wedding Photography', 'DTLT9ESXM9s'), illustration: true },
  robeVitrine: { src: robeVitrine, alt: 'Robe bustier ivoire brodée présentée sur un buste de couture', credit: u('Sou Jest', 'tTn-X7huVbI'), illustration: true },
  robeMarieeSuspendue: { src: robeMarieeSuspendue, alt: 'Robe de mariée en tulle suspendue contre un mur clair', credit: u('Alexander Mass', '4lL0v-ZwQfo'), illustration: true },
  dentelle: { src: dentelle, alt: 'Gros plan sur une dentelle blanche à motifs tourbillonnants', credit: u('Nataliya Melnychuk', 'hw6i4JyCAqw'), illustration: true },
  satin: { src: satin, alt: 'Plis souples d’un satin crème', credit: u('Susan Wilkinson', 'R_bv0S9MC8c'), illustration: true },
  metreCiseaux: { src: metreCiseaux, alt: 'Mètre ruban, fil et ciseaux posés sur un tissu satiné', credit: u('pina messina', 'qQKv7r1BaRw'), illustration: true },
  machineCoudre: { src: machineCoudre, alt: 'Pied presseur d’une machine à coudre sous une lumière chaude', credit: u('Kemal Berkay Dogan', '-AshMf5huHM'), illustration: true },
  portantBobines: { src: portantBobines, alt: 'Robe rouge sur un portant à côté de bobines de fil', credit: u('Paulo Pescada', 'krKax_qLX2A'), illustration: true },
  robeSoireeNoire: { src: robeSoireeNoire, alt: 'Robe de soirée noire à volants portée en studio', credit: u('Khaled Ghareeb', 'QN507MdnxRQ'), illustration: true },
  aiguille: { src: aiguille, alt: 'Aiguille de machine à coudre en noir et blanc', credit: u('Ilya lix', '4l5fsRjJqLM'), illustration: true },
  marieeFenetre: { src: marieeFenetre, alt: 'Mariée en robe de dentelle près d’une fenêtre', credit: u('Andres Molina', 'WKXKCghIwUk'), illustration: true },
} satisfies Record<string, Photo>;
