/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type QuestionId = string;
export type Answer = string;

export interface AnswerRest {
  question_id: QuestionId;
  answer: Answer;
  [k: string]: unknown;
}