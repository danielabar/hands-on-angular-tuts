require 'rails_helper'

describe "Nvigation Menu", js: true do

  it "Changes active menu element depending on route" do
    visit '/'
    expect(find('.active').find('a').text).to eq('Home')

    click_link('Edges')
    expect(find('.active').find('a').text).to eq('Edges')
  end
end