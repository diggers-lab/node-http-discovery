export class SubTestEntity {
  third: string;
  fourth: string;
}

export class TestEntity {
  first: string;
  second: string;
  subTest: SubTestEntity;
  subtests: Array<SubTestEntity>;
}
