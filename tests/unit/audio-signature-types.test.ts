import { describe, expect, it } from 'vitest';
import type * as models from '../../src/models/index.js';
import type { OpenRouter } from '../../src/sdk/sdk.js';

type SttRequestParam = Parameters<OpenRouter['stt']['createTranscription']>[0];
type TtsRequestParam = Parameters<OpenRouter['tts']['createSpeech']>[0];

type IsEqual<TActual, TExpected> = (<T>() => T extends TActual ? 1 : 2) extends
  (<T>() => T extends TExpected ? 1 : 2) ? true : false;
type IsAssignable<TActual, TExpected> = TActual extends TExpected ? true : false;
type AssertTrue<T extends true> = T;
type AssertFalse<T extends false> = T;

const signatureAssertions = {
  sttParamIsBody: true as AssertTrue<IsEqual<SttRequestParam, models.STTRequest>>,
  ttsParamIsBody: true as AssertTrue<IsEqual<TtsRequestParam, models.SpeechRequest>>,
  sttRejectsNestedWrapper: true as AssertFalse<
    IsAssignable<{ sttRequest: models.STTRequest }, SttRequestParam>
  >,
  ttsRejectsNestedWrapper: true as AssertFalse<
    IsAssignable<{ speechRequest: models.SpeechRequest }, TtsRequestParam>
  >,
};

describe('audio request signatures', () => {
  it('typechecks flattened STT/TTS request shapes', () => {
    expect(signatureAssertions).toBeDefined();
  });
});
