import test from 'node:test';
import assert from 'node:assert/strict';
import { STEPS, STRIPS, TEASERS, WORKS } from '../data/catalog';
import {
  buildDevisPayload,
  filterEntries,
  formatTimecode,
  getStripWorks,
  getYoutubeThumbUrl,
  parseRouteFromHash,
} from './navigation';

test('getYoutubeThumbUrl formats valid IDs and rejects empty values', () => {
  assert.equal(
    getYoutubeThumbUrl('COoIdcqK0W4'),
    'https://i.ytimg.com/vi/COoIdcqK0W4/hqdefault.jpg',
  );
  assert.equal(getYoutubeThumbUrl('  '), null);
  assert.equal(getYoutubeThumbUrl(null), null);
});

test('getStripWorks returns linked works for clips and courts, and empty for demo', () => {
  const clips = getStripWorks('clip', WORKS);
  assert.equal(clips.length, 2);
  assert.deepEqual(
    clips.map((w) => w.id),
    ['COoIdcqK0W4', '8KNjYSYqMPA'],
  );

  const courts = getStripWorks('court', WORKS);
  assert.equal(courts.length, 2);
  assert.deepEqual(
    courts.map((w) => w.id),
    ['EmnK2zwiFjc', '5sUIpbPgv5M'],
  );

  const demos = getStripWorks('demo', WORKS);
  assert.equal(demos.length, 0);
  assert.equal(STRIPS.length, 3);
});

test('all 4 steps map to uploaded local images', () => {
  assert.equal(STEPS.length, 4);
  assert.deepEqual(
    STEPS.map((s) => s.image),
    [
      '/assets/aistudio/ecrire_6235f30c.jpg',
      '/assets/aistudio/concevoir_fa45b81b.jpg',
      '/assets/aistudio/tourner_fdd9418b.jpg',
      '/assets/aistudio/monter_01fdbc3b.jpg',
    ],
  );
});

test('filterEntries filters works and teasers accurately', () => {
  const all = filterEntries(WORKS, TEASERS, 'all');
  assert.equal(all.totalCount, 4);

  const clips = filterEntries(WORKS, TEASERS, 'clip');
  assert.equal(clips.totalCount, 2);
  assert.ok(clips.works.every((w) => w.k === 'clip'));

  const demo = filterEntries(WORKS, TEASERS, 'demo');
  assert.equal(demo.totalCount, 0);
});

test('parseRouteFromHash defaults unknown routes to accueil', () => {
  assert.equal(parseRouteFromHash('#/realisations'), 'realisations');
  assert.equal(parseRouteFromHash('#/devis'), 'devis');
  assert.equal(parseRouteFromHash('#/unknown'), 'accueil');
  assert.equal(parseRouteFromHash(''), 'accueil');
});

test('formatTimecode produces 25fps SMPTE formatting', () => {
  assert.equal(formatTimecode(0), '00:00:00:00');
  assert.equal(formatTimecode(1040), '00:00:01:01');
  assert.equal(formatTimecode(3661000), '01:01:01:00');
});

test('buildDevisPayload formats all-steps and partial-step selections', () => {
  const allStepsPayload = buildDevisPayload({
    accessKey: 'k',
    nom: 'Alice',
    mail: 'alice@example.com',
    type: 'Court-métrage / Film court',
    allSteps: true,
    selectedSteps: ['Écrire'],
    budget: '1 000 à 3 000 €',
    delai: '',
    ref: '',
    message: 'Un film court.',
  });
  assert.equal(allStepsPayload['Étapes souhaitées'], 'A à Z (toutes les étapes)');
  assert.equal(allStepsPayload['Délai souhaité'], 'Non précisé');
  assert.equal(allStepsPayload['Lien de référence'], 'Aucun');

  const partialPayload = buildDevisPayload({
    accessKey: 'k',
    nom: 'Bob',
    mail: 'bob@example.com',
    type: '',
    allSteps: false,
    selectedSteps: ['Écrire', 'Monter'],
    budget: 'Je ne sais pas encore',
    delai: 'Décembre',
    ref: 'https://youtu.be/test',
    message: 'Clip test.',
  });
  assert.equal(partialPayload['Étapes souhaitées'], 'Écrire, Monter');
  assert.equal(partialPayload['Type de projet'], 'Non précisé');
});
