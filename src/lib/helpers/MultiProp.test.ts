import type { PropGetter } from '$lib/abstract/APIRoute';
import type { RequestEvent } from '@sveltejs/kit';
import { MultiProp } from './MultiProp'
import { beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

class TestingPropGetter1 implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		return {
			value: 1
		};
	}
}

class TestingPropGetter2 implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		return {
			newValue: 2
		};
	}
}



let event = mockDeep<RequestEvent>()

describe('MultiProp', () => {
  beforeEach(() => {
    mockReset(event)
  })
	it('merges the output of multiple PropGetters', async () => {
    let newClass = MultiProp.merge([new TestingPropGetter1(), new TestingPropGetter2()])

    expect(newClass.getProps(event)).resolves.toEqual({
        value: 1,
        newValue: 2
    })
  });

  it("overwrites previous results if they are the same", async() => {

    let newClass = MultiProp.merge([new TestingPropGetter1(), new TestingPropGetter1()])
    expect(newClass.getProps(event)).resolves.toEqual({
        value: 1
    })
  })
});
