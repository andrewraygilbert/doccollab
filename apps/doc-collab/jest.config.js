module.exports = {
  name: 'doc-collab',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/doc-collab',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
