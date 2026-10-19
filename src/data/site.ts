/**
 * Informations de l'établissement — source unique pour tout le site.
 *
 * Vérifié le 19/10/2026 :
 *  - Google Maps (fiche « Retouches et Créations BELLADELE Couture »)
 *  - Instagram public @belladele_couture (bio : téléphone, e-mail, création sur mesure)
 * Tout ce qui est marqué TODO reste à confirmer auprès de la commerçante.
 */

export const site = {
  name: 'Belladele Couture',
  legalTradeName: 'Retouches et Créations Belladele Couture',
  tagline: 'Création sur mesure et retouches à Groslay',
  description:
    "Atelier de couture à Groslay (Val-d'Oise) : robes de soirée, de cocktail, de mariée et de mairie créées sur mesure ou en semi-mesure, et retouches de vêtements. Sur rendez-vous, du lundi au jeudi.",

  phone: '06 34 42 51 68',
  phoneHref: 'tel:+33634425168',
  phoneIntl: '+33634425168',
  email: 'belladelecouture@gmail.com',

  address: {
    street: '1 rue Magnier Bédu',
    postalCode: '95410',
    city: 'Groslay',
    region: "Val-d'Oise",
    country: 'FR',
  },
  geo: { lat: 48.987105, lng: 2.3643894 },

  googleMapsUrl:
    'https://www.google.com/maps/place/Retouches+et+Cr%C3%A9ations+BELLADELE+Couture/@48.987105,2.3643894,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66920926781cb:0xd1dc9ca4bd64aee0!8m2!3d48.987105!4d2.3643894!16s%2Fg%2F11wnw63p3h',
  googleMapsShareUrl: 'https://maps.app.goo.gl/mBp6C1EENiYRepnA9',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Retouches+et+Cr%C3%A9ations+BELLADELE+Couture%2C+1+Rue+Magnier+B%C3%A9du%2C+95410+Groslay',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Retouches+et+Cr%C3%A9ations+BELLADELE+Couture,+1+Rue+Magnier+B%C3%A9du,+95410+Groslay&output=embed',

  /** Note publique Google relevée le 19/10/2026 (non reproduite en données structurées). */
  rating: { value: '4,9', count: 16, checkedOn: '19 octobre 2026' },

  social: {
    instagram: { handle: '@belladele_couture', url: 'https://www.instagram.com/belladele_couture/' },
    // TODO : aucun compte Facebook / TikTok officiel identifié — à ajouter si la commerçante en possède.
  },

  /** Horaires Google Maps. day: 1 = lundi … 7 = dimanche. */
  hours: [
    { day: 1, label: 'Lundi', open: '10:30', close: '16:00' },
    { day: 2, label: 'Mardi', open: '10:30', close: '16:00' },
    { day: 3, label: 'Mercredi', open: '10:30', close: '16:00' },
    { day: 4, label: 'Jeudi', open: '10:30', close: '16:00' },
    { day: 5, label: 'Vendredi', open: null, close: null },
    { day: 6, label: 'Samedi', open: null, close: null },
    { day: 7, label: 'Dimanche', open: null, close: null },
  ] as { day: number; label: string; open: string | null; close: string | null }[],

  /** Communes voisines citées pour le référencement local (accès facile depuis Groslay). */
  nearby: ['Montmagny', 'Sarcelles', 'Deuil-la-Barre', 'Saint-Brice-sous-Forêt', 'Montmorency', 'Pierrefitte-sur-Seine'],
};

export const nav = [
  { href: '/creation-sur-mesure', label: 'Création sur mesure' },
  { href: '/robe-de-mariee', label: 'Robe de mariée' },
  { href: '/retouches', label: 'Retouches' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
];

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
